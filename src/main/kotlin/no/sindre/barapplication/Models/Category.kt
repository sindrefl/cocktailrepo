package no.sindre.barapplication.Models

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.core.TreeNode
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import org.slf4j.LoggerFactory
import java.io.IOException

@JsonDeserialize(using = CategoryDeserializer::class)
data class Category(var name : String)
var description : String? = null


val Log = LoggerFactory.getLogger(Category::class.java)
class CategoryDeserializer @JvmOverloads constructor(vc: Class<*>? = null) : StdDeserializer<Category>(vc) {
    @Throws(IOException::class, JsonProcessingException::class)
    override fun deserialize(jp: JsonParser, ctxt: DeserializationContext): Category {
        val node = jp.codec.readTree<TreeNode>(jp)
        return Category(name=node.get("name").toString())
    }
}
