create TABLE `cadLivro` (
  `NomeLivro` varchar(50) NULL,
  `codigoLivro` int not null,
  `numeroPagina` int NULL,
  `editora` varchar(40) NULL,
  `genero` varchar(30) NULL,
  `dataPublicacao` date NULL,
  PRIMARY KEY (`codigoLivro`)
)