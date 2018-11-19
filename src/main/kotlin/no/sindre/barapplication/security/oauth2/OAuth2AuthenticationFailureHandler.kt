package no.sindre.barapplication.security.oauth2

import no.sindre.barapplication.util.CookieUtils
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
import org.springframework.stereotype.Component
import org.springframework.web.util.UriComponentsBuilder

import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.io.IOException

import no.sindre.barapplication.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.Companion

@Component
class OAuth2AuthenticationFailureHandler : SimpleUrlAuthenticationFailureHandler() {

    @Throws(IOException::class, ServletException::class)
    override fun onAuthenticationFailure(request: HttpServletRequest, response: HttpServletResponse, exception: AuthenticationException) {
        var targetUrl = CookieUtils.getCookie(request, Companion.REDIRECT_URI_PARAM_COOKIE_NAME)?.value ?: "/"

        targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("error", exception.localizedMessage)
                .build().toUriString()

        HttpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequest(request, response)

        logger.info("AUTHENTICATION FAILURE RUN")
        redirectStrategy.sendRedirect(request, response, targetUrl)
    }
}
