package no.sindre.barapplication

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationListener
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.core.env.Environment
import org.springframework.stereotype.Component

@Component
class ApplicationStartupListener() : ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    val env: Environment? = null

    val LOG = LoggerFactory.getLogger(ApplicationStartupListener::class.java)

    @EventListener
    override fun onApplicationEvent(event: ContextRefreshedEvent) {
        LOG.info("Event caught")
        LOG.info(env!!.getProperty("MODE"))
    }
}