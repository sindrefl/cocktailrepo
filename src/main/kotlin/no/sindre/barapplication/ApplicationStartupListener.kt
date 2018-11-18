package no.sindre.barapplication

import no.sindre.barapplication.services.CocktailService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.ApplicationListener
import org.springframework.context.event.EventListener
import org.springframework.core.env.Environment
import org.springframework.stereotype.Component

@Component
class ApplicationStartupListener(
) : ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    val env: Environment? = null

    @Autowired
    val cocktailService: CocktailService? = null



    val LOG = LoggerFactory.getLogger(ApplicationStartupListener::class.java)

    var started = true
    @EventListener
    override fun onApplicationEvent(event: ApplicationReadyEvent) {
        //LOG.info("Event caught")
        //if(started) cocktailService!!.storeImageScript()
        //started = false
    }
}