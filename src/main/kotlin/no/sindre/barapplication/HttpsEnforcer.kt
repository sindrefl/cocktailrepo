package no.sindre.barapplication

import javax.servlet.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.io.IOException

class HttpsEnforcer : Filter {

    @Throws(ServletException::class)
    override fun init(filterConfig: FilterConfig) {
    }

    @Throws(IOException::class, ServletException::class)
    override fun doFilter(servletRequest: ServletRequest, servletResponse: ServletResponse, filterChain: FilterChain) {
        val request = servletRequest as HttpServletRequest
        val response = servletResponse as HttpServletResponse

        if (request.getHeader(X_FORWARDED_PROTO) != null) {
            if (request.getHeader(X_FORWARDED_PROTO).indexOf("https") != 0) {
                val pathInfo = if (request.pathInfo != null) request.pathInfo else ""
                response.sendRedirect("https://" + request.serverName + pathInfo)
                return
            }
        }

        filterChain.doFilter(request, response)
    }

    override fun destroy() {}

    companion object {
        val X_FORWARDED_PROTO = "X-Forwarded-Proto"
    }
}