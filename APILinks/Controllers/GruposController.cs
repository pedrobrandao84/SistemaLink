using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APILinks.Models;

namespace APILinks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GruposController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GruposController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Grupos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grupo>>> GetGrupos()
        {
            return await _context.Grupos.Include(e => e.EnderecoLink).ToListAsync();
        }

        // GET: api/Grupos/Link?id=1
        [HttpGet("Link")]
        public async Task<ActionResult<IEnumerable<Grupo>>> Get(int id)
        {
            var consulta = _context.Grupos
                                 .Include(e => e.EnderecoLink)
                                 .Where(w => w.EnderecoLink.IdEnderecoLink == id).ToListAsync();

            return await consulta;
        }

        // GET: api/Grupos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Grupo>> GetGrupo(int id)
        {
            var grupo = await _context.Grupos.Include(e => e.EnderecoLink).FirstOrDefaultAsync(c => c.IdGrupo == id);

            if (grupo == null)
            {
                return NotFound();
            }

            return grupo;
        }

        // PUT: api/Grupos/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrupo(int id, Grupo grupo)
        {
            if (id != grupo.IdGrupo)
            {
                return BadRequest();
            }

            grupo.EnderecoLink = _context.EnderecosLinks.FirstOrDefault(c => c.IdEnderecoLink == grupo.EnderecoLink.IdEnderecoLink);
            _context.Entry(grupo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GrupoExists(id))
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

        // POST: api/Grupos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Grupo>> PostGrupo(Grupo grupo)
        {
            grupo.DTCriacao = DateTime.Now;
            grupo.EnderecoLink = _context.EnderecosLinks.FirstOrDefault(c => c.IdEnderecoLink == grupo.EnderecoLink.IdEnderecoLink);
            _context.Grupos.Add(grupo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGrupo", new { id = grupo.IdGrupo }, grupo);
        }

        // DELETE: api/Grupos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Grupo>> DeleteGrupo(int id)
        {
            var grupo = await _context.Grupos.FindAsync(id);
            if (grupo == null)
            {
                return NotFound();
            }

            _context.Grupos.Remove(grupo);
            await _context.SaveChangesAsync();

            return grupo;
        }

        private bool GrupoExists(int id)
        {
            return _context.Grupos.Any(e => e.IdGrupo == id);
        }
    }
}
