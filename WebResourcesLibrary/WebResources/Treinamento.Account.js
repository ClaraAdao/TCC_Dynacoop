if (typeof (Treinamento) == "undefined") { Treinamento = {} }
if (typeof (Treinamento.Account) == "undefined") { Treinamento.Account = {} }

Treinamento.Account = {
	CNPJOnChange: function (executionContext) {
		var formContext = executionContext.getFormContext();

		var cnpj = formContext.getAttribute("new_cnpj").getValue();

		var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
		var x = 0;


		if (cnpj != null) {
			var cnpj = String(cnpj).replace(/[^\d]/g, '');
			if (cnpj == "00000000000000" ||
				cnpj == "11111111111111" ||
				cnpj == "22222222222222" ||
				cnpj == "33333333333333" ||
				cnpj == "44444444444444" ||
				cnpj == "55555555555555" ||
				cnpj == "66666666666666" ||
				cnpj == "77777777777777" ||
				cnpj == "88888888888888" ||
				cnpj == "99999999999999") {
				Treinamento.Account.DynamicsAlert("Por favor, insira um CNPJ válido", "CNPJ Inválido")
				formContext.getAttribute("new_cnpj").setValue("");
			}
			else if (cnpj.length !== 14) {
				Treinamento.Account.DynamicsAlert("Por favor, insira um CNPJ válido", "CNPJ Inválido")
				formContext.getAttribute("new_cnpj").setValue("");
			}
			else if (/0{14}/.test(cnpj)) {
				Treinamento.Account.DynamicsAlert("Por favor, insira um CNPJ válido", "CNPJ Inválido")
				formContext.getAttribute("new_cnpj").setValue("");
			}
			else if (x = 0) {
				for (var i = 0, n = 0; i < 12; n += cnpj[i] * b[++i]);
				if (cnpj[12] != (((n %= 11) < 2) ? 0 : 11 - n)) {
					Treinamento.Account.DynamicsAlert("Por favor, insira um CNPJ válido", "CNPJ Inválido")
					formContext.getAttribute("new_cnpj").setValue("");
				}
			}
			else if (x = 0) {
				for (var i = 0, n = 0; i <= 12; n += cnpj[i] * b[i++]);
				if (cnpj[13] != (((n %= 11) < 2) ? 0 : 11 - n)) {
					Treinamento.Account.DynamicsAlert("Por favor, insira um CNPJ válido", "CNPJ Inválido")
					formContext.getAttribute("new_cnpj").setValue("");
				}
			}
			else {

				var cnpjFormatado = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
				formContext.getAttribute("new_cnpj").setValue(cnpjFormatado);
			}
		}
	},
	NAMEOnChange: function (executionContext) {
		var formContext = executionContext.getFormContext();

		var name = formContext.getAttribute("name").getValue();

		if (name != null) {
			var nameFormatado = name.replace(/(\w)|(\s+\w)/g, letra => letra.toLowerCase());
			var nameForm = nameFormatado; 
			var nameForm = nameFormatado.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());

			formContext.getAttribute("name").setValue(nameForm);
		}
		else {
			Treinamento.Account.DynamicsAlert("Por favor, insira um nome para esta conta", "Nome não encontrado")
			formContext.getAttribute("name").setValue("");
		}

	},
	DynamicsAlert: function (alertText, alertTitle) {
		var alertStrings = {
			confirmButtonLabel: "OK",
			text: alertText,
			title: alertTitle
		};

		var alertOptions = {
			heigth: 120,
			width: 200
		};

		Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
	}
}
