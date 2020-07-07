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
    public class EnderecosLinksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EnderecosLinksController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/EnderecosLinks
        [HttpGet]
        public IEnumerable<EnderecoLink> GetEnderecosLinks()
        {
            return _context.EnderecosLinks;
        }

        // GET: api/EnderecosLinks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EnderecoLink>> GetEnderecoLink(int id)
        {
            var enderecoLink = await _context.EnderecosLinks.FindAsync(id);

            if (enderecoLink == null)
            {
                return NotFound();
            }

            return enderecoLink;
        }

        // PUT: api/EnderecosLinks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEnderecoLink(int id, EnderecoLink enderecoLink)
        {
            if (id != enderecoLink.IdEnderecoLink)
            {
                return BadRequest();
            }

            _context.Entry(enderecoLink).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnderecoLinkExists(id))
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

        // POST: api/EnderecosLinks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<EnderecoLink>> PostEnderecoLink([FromBody] EnderecoLink enderecoLink)
        {
            enderecoLink.DTCriacao = DateTime.Now;
            _context.EnderecosLinks.Add(enderecoLink);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEnderecoLink", new { id = enderecoLink.IdEnderecoLink }, enderecoLink);
        }

        // DELETE: api/EnderecosLinks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EnderecoLink>> DeleteEnderecoLink(int id)
        {
            var enderecoLink = await _context.EnderecosLinks.FindAsync(id);
            if (enderecoLink == null)
            {
                return NotFound();
            }

            _context.EnderecosLinks.Remove(enderecoLink);
            await _context.SaveChangesAsync();

            return enderecoLink;
        }

        private bool EnderecoLinkExists(int id)
        {
            return _context.EnderecosLinks.Any(e => e.IdEnderecoLink == id);
        }
    }
}
