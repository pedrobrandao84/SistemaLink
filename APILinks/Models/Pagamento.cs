using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APILinks.Models
{
    public class Pagamento
    {
        [Key]
        public int CDPagamento { get; set; }

        [Required]
        public int CDUsuario { get; set; }

        [Required]
        [MaxLength(50)]
        public string Plano { get; set; }
        public System.DateTime DTPagamento { get; set; }

        public Usuario Usuario { get; set; }
    }
}
