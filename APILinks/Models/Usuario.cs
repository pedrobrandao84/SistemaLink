﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APILinks.Models
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }

        [MaxLength(200)]
        public string Nome { get; set; }

        [MaxLength(11)]
        public string CPF { get; set; }

        [MaxLength(100)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        [Required]
        public bool STAtivo { get; set; }

        public DateTime DataUtimoAcesso { get; set; }

        public ICollection<EnderecoLink> EnderecoLinks { get; set; }

    }
}
