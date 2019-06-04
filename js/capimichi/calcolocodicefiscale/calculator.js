var $ccf = window.$ccf || jQuery.noConflict();

$ccf(document).ready(function () {

    var modal = null;

    var fiscalCodeInput = $ccf($ccf('#fiscal-code-calculator-open').data("fiscal-code-selector"));

    $ccf('#fiscal-code-calculator-open').click(function (event) {
        this.blur();

        $ccf.ajax({
            url: '/calcolocodicefiscale/index/calculatemodal',
            success: function (html) {
                modal = $ccf(html).appendTo('body').modal();

                $ccf.ajax({
                    url: '/calcolocodicefiscale/index/commons',
                    success: function (r) {
                        var $commons = r.comuni;
                        for (var i = 0; i < $commons.length; i++) {
                            var $common = $commons[i];
                            $ccf(".cdf-common-input").append($ccf('<option>', {
                                value: $common,
                                text: $common
                            }));
                        }
                    }
                });
            },
            error: function () {

            }
        });

        event.preventDefault();
    });

    // var $calculateTemplateUrl = "<?php echo $this->getCalculateUrl(); ?>";

    $ccf("body").on("submit", "#fiscal-code-calculator form", function (e) {

        var form = $ccf(this);

        // var $calculateUrl = $calculateTemplateUrl;
        // $calculateUrl = $calculateUrl.replace(/{name}/g, $form.find(".name").val());
        // $calculateUrl = $calculateUrl.replace(/{lastname}/g, $form.find(".lastname").val());
        // $calculateUrl = $calculateUrl.replace(/{common}/g, $form.find(".common").val());
        // $calculateUrl = $calculateUrl.replace(/{birthday}/g,
        //     [
        //         $form.find(".day").val(),
        //         $form.find(".month").val(),
        //         $form.find(".year").val()
        //     ].join('/')
        // );
        // $calculateUrl = $calculateUrl.replace(/{gender}/g, $form.find(".gender").val());

        $ccf.ajax({
            url: "/calcolocodicefiscale/index/calculate",
            method: 'get',
            data: form.serialize(),
            success: function (response) {
                // var code = new XMLSerializer().serializeToString(response).replace(/(<([^>]+)>)/ig, "");
                console.log(response);

                if (fiscalCodeInput.length) {
                    fiscalCodeInput.val(response.code);
                }

                if (modal) {
                    modal.close();
                }
            },
            error: function (response) {
                console.log("Errore");
                console.log(response);
            }
        });

        e.preventDefault();
    });
});