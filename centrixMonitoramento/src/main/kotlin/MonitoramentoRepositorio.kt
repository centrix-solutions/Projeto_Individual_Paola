import org.springframework.jdbc.core.JdbcTemplate
import java.time.LocalDate
import java.time.LocalTime

class MonitoramentoRepositorio {
    lateinit var jdbcTemplate: JdbcTemplate
    lateinit var jdbcTemplateServer: JdbcTemplate

    fun iniciar() {
        jdbcTemplate = Conexao.jdbcTemplate!!
        jdbcTemplateServer = Conexao.jdbcTemplateServer!!
    }

    fun registrarDados(
        data: LocalDate,
        hora: LocalTime,
        dado: Float,
        fkcompExis: Int,
        idMaquinaDado: Int,
        idEmpresaDado: Int
    ) {
        jdbcTemplate.update(
            """
        INSERT INTO Monitoramento (Data_captura, Hora_captura, Dado_Capturado, 
        fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)
        VALUES (?, ?, ?, ?, ?, ?)
        """.trimIndent(),
            data,
            hora,
            dado,
            fkcompExis,
            idMaquinaDado,
            idEmpresaDado
        )
        jdbcTemplateServer.update(
            """
        INSERT INTO monitoramento (Data_captura, Hora_captura, Dado_Capturado,
        fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)
        VALUES (?, ?, ?, ?, ?, ?)
        """.trimIndent(),
            data,
            hora,
            dado,
            fkcompExis,
            idMaquinaDado,
            idEmpresaDado
        )
    }
}
