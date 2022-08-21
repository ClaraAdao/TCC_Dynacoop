using SharedProject.Models;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk.Messages;

namespace Plugin
{
    public class AccountManager : PluginImplement
    {

        public override void ExecutePlugin(IServiceProvider serviceProvider)
        {

            Entity conta = this.Context.Stage == 10 ? (Entity)Context.InputParameters["Target"] : (Entity)this.Context.PostEntityImages["PostImage"];

            //10 = Pre-Validation
            //20 - Pre-Operation
            //30 - Post-Operation

            if (Context.Stage == (int)SharedProject.Models.Enumerator.PluginStages.PreValidation)
            {
                string cnpj = conta["new_cnpj"].ToString();

                QueryExpression recuperarContaComCnpj = new QueryExpression("account");
                recuperarContaComCnpj.Criteria.AddCondition("new_cnpj", ConditionOperator.Equal, cnpj);
                EntityCollection contatos = this.Service.RetrieveMultiple(recuperarContaComCnpj);

                if (contatos.Entities.Count() > 0)
                {
                    throw new InvalidPluginExecutionException("CNPJ já cadastrado, tente novamente!");
                }
            }
        }
    }
}
