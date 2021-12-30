(function($) {
    $(document).on("page:load", function() {
      if (Shopify.Checkout.step === "contact_information") {
        console.log("change")
        var select = document.getElementById("checkout_shipping_address_country");
        function dealselect () {
          var selectValue = select.options[select.selectedIndex].value;
          console.log(select.options[select.selectedIndex].value)
          if (selectValue == "Brazil") {
            document.getElementById("checkout_shipping_address_address2").placeholder = "Street";
            $('[for="checkout_shipping_address_address2"]').html("Street");
            document.getElementById("checkout_shipping_address_address1").placeholder = "house number";
            $('[for="checkout_shipping_address_address1"]').html("house number");
            $('[data-address-field="address1"] #error-for-address1').html("Enter an house number");
            $("#checkout_shipping_address_address2").attr("aria-required","true");
            console.log("0000",$('div[data-address-field="address2"] #error-for-address2').length)
            if ($('div[data-address-field="address2"] #error-for-address2').length == 0) {
                $('div[data-address-field="address2"]').append('<p class="field__message field__message--error" id="error-for-address2" style="display:none;">Enter an Street</p>');
            }
             $("#continue_button").on("click", function(e) {
              console.log("continue_button",document.getElementById("checkout_shipping_address_address2").value)
              if (document.getElementById("checkout_shipping_address_address2").value) {
                $('div[data-address-field="address2"] #error-for-address2').hide();
              } else {
                  e.preventDefault();
                 $('div[data-address-field="address2"] #error-for-address2').show();
              }
            });
          } else {
            $('[data-address-field="address1"] #error-for-address1').html($("#checkout_shipping_address_address1").placeholder); 
          }
        }
        dealselect();
        $("#checkout_shipping_address_country").blur(function(){
          dealselect();
        });
       
      }
    });
  })(Checkout.$);