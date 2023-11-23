import java.io.OutputStream
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL

class Notificacao {

    private fun enviarNotificacaoSlack(webhookUrl: String, mensagem: String) {
        try {
            val url = URL(webhookUrl)
            val connection = url.openConnection() as HttpURLConnection

            // Configurar a conexão
            connection.requestMethod = "POST"
            connection.doOutput = true

            // Escrever a mensagem no corpo da requisição
            val requestBody = "payload={\"text\": \"$mensagem\"}"
            val outputStream: OutputStream = connection.outputStream
            val writer = OutputStreamWriter(outputStream, "UTF-8")
            writer.write(requestBody)

            writer.flush()
            writer.close()
            outputStream.close()

            // Obter a resposta da requisição
            val responseCode = connection.responseCode
            if (responseCode == HttpURLConnection.HTTP_OK) {
                println("Notificação enviada com sucesso para o Slack.")
            } else {
                println("Falha ao enviar notificação para o Slack. Código de resposta: $responseCode")
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun notificarProcessos(processos: Float) {
        val webhookUrl = "https://hooks.slack.com/services/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"
        val mensagem = "Aviso: Processos acima do limite! ($processos)"

        enviarNotificacaoSlack(webhookUrl, mensagem)
    }

    fun notificarUSB(usb: Float) {
        val webhookUrl = "https://hooks.slack.com/services/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"
        val mensagem = "Aviso: USB acima do limite! ($usb)"

        enviarNotificacaoSlack(webhookUrl, mensagem)
    }

    fun notificarJanelas(janelas: Float) {
        val webhookUrl = "https://hooks.slack.com/services/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"
        val mensagem = "Aviso: Janelas acima do limite! ($janelas)"

        enviarNotificacaoSlack(webhookUrl, mensagem)
    }

    //fun notificacaoTeste(Teste: Float) {
    //    val webhookUrl = "https://hooks.slack.com/services/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"
    //    val mensagem = "Notificação Teste"
    //
    //    enviarNotificacaoSlack(webhookUrl, mensagem)
    //}
}