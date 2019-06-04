var $ccf = window.$ccf || jQuery.noConflict();

$ccf(document).ready(function () {

    var fiscalCodeChecker = $ccf("#fiscal-code-checker");

    if (fiscalCodeChecker.length) {
        var submitButton = $ccf(fiscalCodeChecker.data("submit-button-selector"));

        $ccf("body").on("input", fiscalCodeChecker.data("fiscal-code-selector"), function () {

            var input = $ccf(this);
            var form = input.closest('form');

            $ccf.ajax({
                url: "/calcolocodicefiscale/index/check",
                method: 'get',
                data: {
                    fiscalCode: input.val(),
                },
                success: function (r) {
                    if (r.status === 200) {
                        input.removeClass("invalid-fiscal");
                        form.removeClass("invalid-fiscal");
                        submitButton.removeAttr("disabled");
                    } else {
                        input.addClass("invalid-fiscal");
                        form.addClass("invalid-fiscal");
                        submitButton.attr("disabled", "disabled");
                    }
                },
                error: function () {
                    input.addClass("invalid-fiscal");
                    form.addClass("invalid-fiscal");
                    submitButton.attr("disabled", "disabled");
                }
            });

        });
    }


});