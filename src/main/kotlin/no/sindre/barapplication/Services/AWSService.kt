package no.sindre.barapplication.Services

import java.io.File

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.CopyObjectResult
import com.amazonaws.services.s3.model.DeleteObjectsRequest
import com.amazonaws.services.s3.model.DeleteObjectsResult
import com.amazonaws.services.s3.model.ObjectListing
import com.amazonaws.services.s3.model.PutObjectResult
import com.amazonaws.services.s3.model.S3Object
import org.springframework.stereotype.Service


@Service
class AWSService(
        val s3client: AmazonS3?
) {

    private val bucketName = "cocktailfiles"

    //uploading object
    fun putObject(key: String, file: File): PutObjectResult {
        return s3client!!.putObject(bucketName, key, file)
    }

    //listing objects
    fun listObjects(): ObjectListing {
        return s3client!!.listObjects(bucketName)
    }

    //get an object
    fun getObject(objectKey: String): S3Object {
        return s3client!!.getObject(bucketName, objectKey)
    }

    //copying an object
    fun copyObject(
            sourceBucketName: String,
            sourceKey: String,
            destinationBucketName: String,
            destinationKey: String
    ): CopyObjectResult {
        return s3client!!.copyObject(
                sourceBucketName,
                sourceKey,
                destinationBucketName,
                destinationKey
        )
    }

    //deleting an object
    fun deleteObject(bucketName: String, objectKey: String) {
        s3client!!.deleteObject(bucketName, objectKey)
    }

    //deleting multiple Objects
    fun deleteObjects(delObjReq: DeleteObjectsRequest): DeleteObjectsResult {
        return s3client!!.deleteObjects(delObjReq)
    }
}