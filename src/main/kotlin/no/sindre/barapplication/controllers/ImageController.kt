package no.sindre.barapplication.controllers

import no.sindre.barapplication.models.Log
import no.sindre.barapplication.services.AWSService
import no.sindre.barapplication.services.ImageService
import org.springframework.core.env.Environment
import org.springframework.core.io.ClassPathResource
import org.springframework.http.MediaType
import org.springframework.util.StreamUtils
import org.springframework.web.bind.annotation.*
import java.io.IOException
import javax.servlet.http.HttpServletResponse


@RestController
@RequestMapping("/api/images")
class ImageController(val imageService: ImageService,
                      val awsService: AWSService,
                      val env: Environment){



    @GetMapping("/drinks", produces = [MediaType.IMAGE_JPEG_VALUE])
    fun getdrinkImage(@RequestParam id: Int, response: HttpServletResponse) {
        val img = imageService.getCocktailImage(id)
        StreamUtils.copy(imageService.getCocktailImage(id).inputStream(), response.outputStream)
    }

    @GetMapping("/categories", produces = [MediaType.IMAGE_JPEG_VALUE])
    fun getcatImage(@RequestParam path: String, response: HttpServletResponse) {
        if (env.getProperty("MODE").equals("local")) {
            try {
                val imgFile = ClassPathResource("/public/images/categories/$path")
                response.setHeader("Content-type", MediaType.IMAGE_JPEG_VALUE)
                StreamUtils.copy(imgFile.inputStream, response.outputStream)
            } catch (e: IOException) {
                Log.info("IOException thrown")
                Log.info(e.message)
            }
        } else {
            try {
                val obj = awsService.getObject("categories/$path")
                response.contentType = MediaType.IMAGE_JPEG_VALUE
                StreamUtils.copy(obj.objectContent, response.outputStream)
            } catch (e: Exception) {
                CocktailController.LOG.info("Aws failed")
                CocktailController.LOG.info(e.message)
            }

        }
    }

    @GetMapping("/glass", produces = [MediaType.IMAGE_JPEG_VALUE])
    fun getglassImage(@RequestParam path: String, response: HttpServletResponse) {
        if (env.getProperty("MODE").equals("local")) {
            try {
                val imgFile = ClassPathResource("/public/images/glass/$path")
                response.setHeader("Content-type", MediaType.IMAGE_JPEG_VALUE)
                StreamUtils.copy(imgFile.inputStream, response.outputStream)
            } catch (e: IOException) {
                Log.info("IOException thrown")
                Log.info(e.message)
            }
        } else {
            try {
                val obj = awsService.getObject("glass/$path")
                response.contentType = MediaType.IMAGE_JPEG_VALUE
                StreamUtils.copy(obj.objectContent, response.outputStream)
            } catch (e: Exception) {
                CocktailController.LOG.info("aws failed")
                CocktailController.LOG.info(e.message)
            }
        }
    }
}
