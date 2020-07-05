using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APILinks.Models
{
    public class EnderecoLink
    {
        [Key]
        public int IdEnderecoLink { get; set; }

        [Required]
        [MaxLength(100)]
        public String Nome { get; set; }

        [Required]
        [MaxLength(200)]
        public String URL { get; set; }

        [Required]
        public int QTDClicks { get; set; }

        public DateTime DTCriacao { get; set; }
    }
}
