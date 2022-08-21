using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Tooling.Connector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TCC_Dynacoop
{
    public class ConnectionFactory
    {
        public static IOrganizationService GetService()
        {
            string connectionString =
                "AuthType=OAuth;" +
                "username=tccdynacoop@tccdyp.onmicrosoft.com;" +
                "Password=tccdyp@123;" +
                "Url=https://dynamics01.crm2.dynamics.com;" +
                "AppId=19f8767c-2706-464b-89ea-259d2d7db63e;" +
                "RedirectUri = app://58145891-0C36-4500-8554-080854F2AC97;";

            CrmServiceClient crmServiceClient = new CrmServiceClient(connectionString);
            return crmServiceClient.OrganizationWebProxyClient;
        }
    }
}
