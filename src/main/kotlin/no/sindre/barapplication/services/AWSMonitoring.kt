package no.sindre.barapplication.services

import com.amazonaws.services.cloudwatch.AmazonCloudWatchClientBuilder;
import com.amazonaws.services.cloudwatch.model.ListMetricsRequest;
import com.amazonaws.services.cloudwatch.model.Metric;
import org.springframework.stereotype.Service

@Service
class AWSMonitoring(){
}

val cw = AmazonCloudWatchClientBuilder.defaultClient()

fun sendRequest(){
    val request = ListMetricsRequest()
            //.withMetricName(name)
            //.withNamespace(namespace)

    var done = false;

    while(!done) {
        val response = cw.listMetrics(request)

        for(metric:Metric in response.metrics) {
            System.out.printf(
                    "Retrieved metric %s", metric.metricName
            )
        }

        request.nextToken = response.nextToken

        if(response.nextToken == null) {
            done = true;
        }
    }

}

