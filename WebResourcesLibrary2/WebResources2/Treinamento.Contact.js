if (typeof (Treinamento) == "undefined") { Treinamento = {} }
if (typeof (Treinamento.Contact) == "undefined") { Treinamento.Contact = {} }

Treinamento.Contact = {
	CPFOnChange: function (executionContext) {
		var formContext = executionContext.getFormContext();

		var cpf = formContext.getAttribute("new_cpf").getValue();

		var Soma;
		var Resto;
		Soma = 0;
		var x = 0;

		if (cpf != null) {
			var cpf = String(cpf).replace(/[^\d]/g, '');
			if (cpf == "00000000000" ||
				cpf == "11111111111" ||
				cpf == "22222222222" ||
				cpf == "33333333333" ||
				cpf == "44444444444" ||
				cpf == "55555555555" ||
				cpf == "66666666666" ||
				cpf == "77777777777" ||
				cpf == "88888888888" ||
				cpf == "99999999999") {
				Treinamento.Contact.DynamicsAlert("Por favor, insira um CPF válido", "CPF Inválido")
				formContext.getAttribute("new_cpf").setValue("");
			}
			else if (cpf.length !== 11) {
				Treinamento.Contact.DynamicsAlert("Por favor, insira um CPF válido", "CPF Inválido")
				formContext.getAttribute("new_cpf").setValue("");
			}
			else if (x = 0) {
				for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
				Resto = (Soma * 10) % 11;

				if ((Resto == 10) || (Resto == 11)) Resto = 0;
				if (Resto != parseInt(cpf.substring(9, 10))) {
					Treinamento.Contact.DynamicsAlert("Por favor, insira um CPF válido", "CPF Inválido")
					formContext.getAttribute("new_cpf").setValue("");
				}
				Soma = 0;
			}
			else if (x = 0) {
				for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
				Resto = (Soma * 10) % 11;

				if ((Resto == 10) || (Resto == 11)) Resto = 0;
				if (Resto != parseInt(cpf.substring(10, 11))) {
					Treinamento.Contact.DynamicsAlert("Por favor, insira um CPF válido", "CPF Inválido")
					formContext.getAttribute("new_cpf").setValue("");
				}
			}
			else {
				var cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
				formContext.getAttribute("new_cpf").setValue(cpfFormatado);
			}
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