import org.springframework.jdbc.core.JdbcTemplate

class MaquinaRepositorio {

    lateinit var jdbcTemplate: JdbcTemplate
    lateinit var jdbcTemplateServer: JdbcTemplate

    fun iniciar() {

        jdbcTemplate = Conexao.jdbcTemplate!!
        jdbcTemplateServer = Conexao.jdbcTemplateServer!!

    }

    fun autenticarMaquina(id: String): Boolean {
        val verificarMaquina = jdbcTemplateServer.queryForObject(
            "SELECT COUNT(*) AS count FROM Maquinas WHERE Id_do_dispositivo = ?",
            arrayOf(id),
            Int::class.java
        )
        return verificarMaquina == 1
    }

    fun registrarMaquina(novaMaquina: Maquina, usuarioLogado: Usuario) {
     //   jdbcTemplate.update(
      //      """
      //  INSERT INTO Maquinas (Sistema_Operacional, Id_do_dispositivo, fkEmpMaq)
      //  VALUES (?, ?, ?)
      //  """.trimIndent(),
      //      novaMaquina.SO,
      //      novaMaquina.idCPU,
       //     novaMaquina.fkEmpMaq
       // )
      //  jdbcTemplate.update(
      //      """
      //          INSERT INTO Notificacao (idDispositivo, Funcionario_Solicitante, fkEmpNot)
      //          VALUES (?, ?, ?)
     //       """.trimIndent(),
     //       novaMaquina.idCPU,
     //       usuarioLogado.nome,
     //       novaMaquina.fkEmpMaq
       // )
        jdbcTemplateServer.update(
            """
        INSERT INTO Maquinas (Sistema_Operacional, Id_do_dispositivo, fkEmpMaq)
        VALUES (?, ?, ?)
        """.trimIndent(),
            novaMaquina.SO,
            novaMaquina.idCPU,
            novaMaquina.fkEmpMaq
        )

        jdbcTemplateServer.update(
            """
        INSERT INTO Notificacao (idDispositivo, Funcionario_Solicitante, fkEmpNot)
        VALUES (?, ?, ?)
        """.trimIndent(),
            novaMaquina.idCPU,
            usuarioLogado.nome,
            novaMaquina.fkEmpMaq
        )
    }
}