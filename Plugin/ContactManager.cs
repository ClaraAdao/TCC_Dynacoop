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
    public class ContactManager : PluginImplement
    {

        public override void ExecutePlugin(IServiceProvider serviceProvider)
        {

            Entity contato = this.Context.Stage == 10 ? (Entity)Context.InputParameters["Target"] : (Entity)this.Context.PostEntityImages["PostImage"];

            //10 = Pre-Validation
            //20 - Pre-Operation
            //30 - Post-Operation

            if (Context.Stage == (int)SharedProject.Models.Enumerator.PluginStages.PreValidation)
            {
                string cpf = contato["new_cpf"].ToString();

                QueryExpression recuperarContatoComCpf = new QueryExpression("contact");
                recuperarContatoComCpf.Criteria.AddCondition("new_cpf", ConditionOperator.Equal, cpf);
                EntityCollection contatos = this.Service.RetrieveMultiple(recuperarContatoComCpf);

                if (contatos.Entities.Count() > 0)
                {
                    throw new InvalidPluginExecutionException("CPF já cadastrado, tente novamente!");
                }
            }
        }
    }
}
