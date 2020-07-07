using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APILinks.Models
{
    public class Grupo
    {
        [Key]
        public int IdGrupo { get; set; }

        [Required]
        [MaxLength(100)]
        public String Nome { get; set; }

        [Required]
        [MaxLength(200)]
        public String URL { get; set; }

        public int Ordem { get; set; }

        public int QTDClicks { get; set; }

        public DateTime DTCriacao { get; set; }

        public EnderecoLink EnderecoLink { get; set; }
    }
}
