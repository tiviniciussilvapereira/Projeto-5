$(function(){
    var valorAtual = 0; 
    var foiArrastado = false; 
    var precoMaximo = 900000; 
    var precoAtual = 0;

    $('.barra-pointer').mousedown(function(){
        foiArrastado = true; 
    })

    $('html body').mouseup(function(){
        foiArrastado = false;
        enableTextSelection();
    })

    //mostrar a posição do mouse em relação à div barra-preço
    $('.barra-preco').mousemove(function(event){
        if(foiArrastado){
            disableTextSelection();
            var base = $(this); 
            var mouseX = event.pageX - base.offset().left;
            if(mouseX < 0)
                mouseX = 0; 
            if(mouseX > base.width())
                mouseX = base.width();

            //preencher a barra de preço de acordo com a posição do mouse em relação ao width
            $('.barra-pointer').css('left',(mouseX-15)+'px'); 
            valorAtual = (mouseX / base.width()) * 100; 
            $('.barra-preco-fill').css('width',valorAtual+'%');

            //mostrar o resultado do preço de acordo com a barra de preço
            precoAtual = (valorAtual/100) * precoMaximo;
            precoAtual = formatarPreco(precoAtual);
            $('.preco-pesquisa').html('R$'+precoAtual); 

        }
    })
    //correção de casas decimais
    function formatarPreco(precoAtual){
        precoAtual = precoAtual.toFixed(2); 
        precoArray = precoAtual.split('.'); 
        
        var novoPreco = formatarTotal(precoArray);

        return novoPreco;
    }

    function formatarTotal(precoArray){
        if(precoArray[0] < 1000){
            return precoArray[0]+','+precoArray[1];
        }else if(precoArray[0] < 10000){
            return precoArray[0][0]+'.'+precoArray[0].substr(1,precoArray[0].length)+','+precoArray[1];
        }else{
            return precoArray[0][0]+precoArray[0][1]+'.'+precoArray[0].substr(2,precoArray[0].length)+','+precoArray[1];
        }
    }

    //correção para não selecionar textos na pagina enquanto arrasta a barra de preço
    function disableTextSelection(){
        $("body").css("-webkit-user-select","none");
        $("body").css("-moz-user-select","none");
        $("body").css("-ms-user-select","none");
        $("body").css("-o-user-select","none");
        $("body").css("user-select","none");
    }
    //funcao para normalizar a selecao de textos na pagina quando a funcao da barra de preco nao esta sendo utilizada
    function enableTextSelection(){
        $("body").css("-webkit-user-select","auto");
        $("body").css("-moz-user-select","auto");
        $("body").css("-ms-user-select","auto");
        $("body").css("-o-user-select","auto");
        $("body").css("user-select","auto");
    }

    
    //Slider personalizado da seção de venda individual
    var imgShow = 3;  
    var maxIndex = Math.ceil($('.mini-img-wrapper').length/3) - 1;
    var curIndex = 0; 

    initSlider();
    navigateSlider();
    clickSlider();

    function initSlider(){
        var amt = $('.mini-img-wrapper').length * 33.3; 
        var elScroll = $('.nav-galeria-wrapper'); 
        var elSingle = $('.mini-img-wrapper'); 
        elScroll.css('width',amt+'%'); 
        elSingle.css('width',33.3*(100/amt)+'%');
    }

    function navigateSlider(){
        $('.seta-direita').click(function(){
            if(curIndex < maxIndex){
                curIndex++;
                var elOff = $('.mini-img-wrapper').eq(curIndex*3).offset().left - $('.nav-galeria-wrapper').offset().left; 
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            } else{
                //console.log('final');
            }
        })
        $('.seta-esquerda').click(function(){
            if(curIndex > 0){
                curIndex--;
                var elOff = $('.mini-img-wrapper').eq(curIndex*3).offset().left - $('.nav-galeria-wrapper').offset().left; 
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            } else{
                //console.log('final');
            }
        })
    }


    function clickSlider(){
        $('.mini-img-wrapper').click(function(){
            $('.mini-img-wrapper').css( 'background-color', 'transparent');
            $(this).css( 'background-color', '#a80909');

            var img = $(this).children().css('background-image');
            $('.foto-destaque').css('background-image',img);
        })

        $('.mini-img-wrapper').eq(0).click();
    }




});