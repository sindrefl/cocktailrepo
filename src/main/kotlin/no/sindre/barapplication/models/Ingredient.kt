package no.sindre.barapplication.models

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.core.TreeNode
import com.fasterxml.jackson.databind.DeserializationContext
import java.io.IOException
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import org.slf4j.LoggerFactory

@JsonDeserialize(using = IngredientDeserializer::class)
data class Ingredient(var name : String, var description: String, var type : String, var isBattery: Boolean)

val LOG = LoggerFactory.getLogger("ingredient")

class IngredientDeserializer @JvmOverloads constructor(vc: Class<*>? = null) : StdDeserializer<Ingredient>(vc) {
    @Throws(IOException::class, JsonProcessingException::class)
    override fun deserialize(jp: JsonParser, ctxt: DeserializationContext): Ingredient {
        val node = jp.codec.readTree<TreeNode>(jp)
        return Ingredient(name=node.get("name").toString(), description=node.get("description").toString(), type=node.get("type").toString(), isBattery = node.get("battery").toString().equals("true"))
    }
}