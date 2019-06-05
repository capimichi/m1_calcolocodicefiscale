var $ccf = window.$ccf || jQuery.noConflict();

$ccf(document).ready(function () {

    function updateCommonSearch(q) {
        var hints = "";

        if (q.length > 2) {

            var foundCommons = [];
            $ccf.each(commons, function (index, common) {

                if (common.toLowerCase().indexOf(q.toLowerCase()) >= 0) {
                    foundCommons.push({
                        name: common,
                        score: common.toLowerCase().indexOf(q.toLowerCase())
                    });
                }
            });

            foundCommons.sort(function (a, b) {
                if (a.score > b.score) {
                    return 1;
                } else {
                    return -1;
                }
            });

            $ccf.each(foundCommons, function (index, common) {
                var hintTemplate = "<span data-name='{common}'>{common}</span>";
                var hint = hintTemplate.replace(/{common}/g, common.name);
                hints += hint;
            });

            $ccf(".commons-hint").html(hints);
        }
    }

    var fiscalCodeInput = $ccf($ccf('#fiscal-code-calculator-open').data("fiscal-code-selector"));

    var commons = [];

    $ccf('#fiscal-code-calculator-open').click(function (event) {
        this.blur();

        $ccf.ajax({
            url: '/calcolocodicefiscale/index/calculatemodal',
            success: function (html) {
                $ccf(html).appendTo('body').modal();

                if (commons.length <= 0) {
                    $ccf.ajax({
                        url: '/calcolocodicefiscale/index/commons',
                        success: function (r) {
                            commons = r.comuni;
                        }
                    });
                }

                $ccf("body").on("input", "input.fcd-common", function () {
                    updateCommonSearch(jQuery(this).val());
                });

                $ccf("body").on("click", "#fiscal-code-calculator .commons-hint span", function () {
                    var value = jQuery(this).data("name");
                    console.log(value);
                    $ccf("input.fcd-common").val(value);
                    updateCommonSearch(value);
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

                $ccf.modal.close();  // <= close after AJAX call succeeds

            },
            error: function (response) {
                console.log("Errore");
                console.log(response);
                alert("Errore, i dati inseriti non sono validi");
            }
        });

        e.preventDefault();
    });
});