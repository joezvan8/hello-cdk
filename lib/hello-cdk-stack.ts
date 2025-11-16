import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   // Defining the Lambda function resource
    const myFunction = new lambda.Function(this, "HelloWorldFunction",
            {        
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: "index.handler",
            code: lambda.Code.fromInline(`
                 exports.handler = async function(event) {
                      return {
                              statusCode: 200,
                              body: JSON.stringify('Hello World!'),
                      };
                };              
              `),
            });
    // Defining the Lambda function URL resource
    const myFunctionUrl = myFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // Defining a CloudFormation output for URL
    new cdk.CfnOutput(this, "myFunctionUrlOutput", {
      value: myFunctionUrl.url,
    }) 
  }
}

