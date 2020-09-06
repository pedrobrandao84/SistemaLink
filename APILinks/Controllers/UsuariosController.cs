using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APILinks.Models;
using System.Globalization;

namespace APILinks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios/pagamento
        [HttpPost("pagamento")]
        public async Task<ActionResult<bool>> PagamentoAsync(Hotmart hotmart)
        {
            string chave = "Ws50fDk5VEAEuflFx3RFZmVLJIryPp346556";

            //valida chave do HOTMART
            if (hotmart.hottok == chave && (hotmart.subscription_status == "active" || hotmart.subscription_status == "started"))
            {
                //consulta cliente pelo CPF na base
                var resultado = await _context.Usuarios.FirstOrDefaultAsync(w => w.Email == hotmart.email);

                var planoHotmart = hotmart.name_subscription_plan.Substring(0, 1);
                var dataPagamento = Convert.ToDateTime(hotmart.confirmation_purchase_date, new CultureInfo("pt-BR", true));

                //se não existe o cliente na base
                if (resultado == null)
                {
                    Usuario usuario = new Usuario();
                    usuario.CPF = hotmart.doc;
                    usuario.DataCadastro = DateTime.Now;
                    usuario.Email = hotmart.email;
                    usuario.STAtivo = true;
                    usuario.Nome = hotmart.name;
                    usuario.Celular = hotmart.phone_local_code + hotmart.phone_number;

                    usuario.PlanoVigente = planoHotmart;
                    usuario.DTUltimoPagamento = dataPagamento;

                    //cadastra o cliente
                    _context.Usuarios.Add(usuario);

                    CreatedAtAction("GetUsuario", new { id = usuario.IdUsuario }, usuario);
                    
                    //registra o pagamento do plano
                    var pagamento = await _context.Pagamentos.FirstOrDefaultAsync(c => c.CDUsuario == usuario.IdUsuario && c.Plano == usuario.PlanoVigente);
                    if (pagamento != null)
                        pagamento.DTPagamento = dataPagamento;
                    else
                    {
                        pagamento = new Pagamento();
                        pagamento.CDUsuario = usuario.IdUsuario;
                        pagamento.Plano = usuario.PlanoVigente;
                        pagamento.DTPagamento = dataPagamento;

                        _context.Pagamentos.Add(pagamento);
                    }

                    await _context.SaveChangesAsync();

                    //envia email de dados de acesso IMPLEMENTAR ISSO
                    //await _repositorio.EmailNovoUsuario("Dados de Acesso ao Sistema:", coach.Nome, coach.Email, coachGravado.Entidade.CDCoach);
                    
                }
                else //cliente existente na base
                {
                    //se uma notificacao de cancelamento marca o coach como excluido
                    if (hotmart.subscription_status.ToUpper().Contains("CANCELED"))
                    {
                        resultado.STAtivo = false;
                        _context.Entry(resultado).State = EntityState.Modified;
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        //se não existir pagamento

                        if (!resultado.Pagamento.Any() || !resultado.Pagamento.Any(c => c.Plano == planoHotmart))
                        {
                            //registra o pagamento
                            var pagamento = new Pagamento();
                            pagamento.CDUsuario = resultado.IdUsuario;
                            pagamento.Plano = resultado.PlanoVigente;
                            pagamento.DTPagamento = dataPagamento;

                            _context.Pagamentos.Add(pagamento);

                            //registra data de pagamento e plano na tabela do coach
                            resultado.DTUltimoPagamento = dataPagamento;
                            resultado.PlanoVigente = planoHotmart;

                            _context.Entry(resultado).State = EntityState.Modified;
                            _context.Entry(pagamento).State = EntityState.Modified;
                        }
                        else //se existe pagamento
                        {
                            //atualiza data pagamento plano
                            var pagamento = await _context.Pagamentos.FirstOrDefaultAsync(c => c.CDUsuario == resultado.IdUsuario && c.Plano == planoHotmart);
                            pagamento.DTPagamento = dataPagamento;
                            _context.Entry(pagamento).State = EntityState.Modified;

                            //se nao existe pagamento para esse plano
                            if (resultado.PlanoVigente != planoHotmart)
                            {
                                //registra o update do plano na tabela do coach
                                resultado.PlanoVigente = planoHotmart;
                            }

                            resultado.DTUltimoPagamento = dataPagamento;
                            _context.Entry(resultado).State = EntityState.Modified;

                            //consulta os pagamentos atualizados do coach
                            //var coachAtualizado = await _repositorio.Consultar(resultado.Entidade.CDCoach);

                            //controle dos pagamentos em dias
                            //bool pagamentoEmDias = true;

                            //verifica todos os pagamentos se estão em dias com uma margem de 40 dias
                            //for (int i = 0; i < coachAtualizado.Entidade.CoachPagamento.Count; i++)
                            //{
                            //    if (DateTime.Now.Subtract(coachAtualizado.Entidade.CoachPagamento.ToList()[i].DTPagamento).Days > 40)
                            //        pagamentoEmDias = false;
                            //}

                            //atualiza a data de pagamento no cadastro do coach
                            //if (pagamentoEmDias)
                            //{
                            //    coachAtualizado.Entidade.DTUltimoPagamento = dataPagamento;
                            //    await _repositorio.UpdateDtPagamento(coachAtualizado.Entidade);
                            //}

                            await _context.SaveChangesAsync();
                        }
                    }

                }
            }

            return await Task.FromResult(true);
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios(string nome, bool? ativo, string cpf)
        {
            var usuario = await _context.Usuarios.Where(w => 
                                (w.Nome.Contains(nome) || string.IsNullOrEmpty(nome)) && 
                                (w.STAtivo == ativo || ativo == null) &&
                                (w.CPF == cpf || string.IsNullOrEmpty(cpf))).ToListAsync();
            return usuario;
        }

        // GET: api/Usuarios/login
        [HttpPut("login")]
        public async Task<ActionResult<Usuario>> PutUsuario(Usuario usuario)
        {
            var usuarioLogin = await _context.Usuarios.FirstOrDefaultAsync(w => w.Email == usuario.Email && w.Senha == usuario.Senha);

            if(usuarioLogin != null)
            {
                usuarioLogin.DataUtimoAcesso = DateTime.Now;
                _context.Entry(usuarioLogin).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }

            return usuarioLogin;
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
        {
            if (id != usuario.IdUsuario)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Usuarios
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = usuario.IdUsuario }, usuario);
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Usuario>> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return usuario;
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.IdUsuario == id);
        }
    }
}
