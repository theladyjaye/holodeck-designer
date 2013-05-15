define([
    'jquery',
    'underscore',
    'mustache',
    'src/resources/js/utils/scene-light'
], function($, _ , Mustache, SceneLight){

    var $view = false;
    var $sceneLights = false;
    //var lightTemplate = false;
    var currentLights = {};


    function init(){
        $view = $('#scene-designer');
        $view.on('dragenter', onLightEnter);
        $view.on('dragleave', onLightLeave);
        $view.on('drop', onLightDrop);
        $view.on('dragover', onLightOver);

        $sceneLights = $('#scene-lights-list');

        //lightTemplate = Mustache.compile($('#scene-light-template').html());
    }

    function onLightEnter(e){
        $view.addClass('droptarget');
    }

    function onLightLeave(e){
        $view.removeClass('droptarget');
    }

    function onLightOver(e){

        var dataTransfer = e.originalEvent.dataTransfer;
        var isBridgeLight = dataTransfer.types[0] == 'application/x-bridge-light';

        if (isBridgeLight){
            e.preventDefault();
            e.originalEvent.dataTransfer.dropEffect = 'copy';
        }
    }

    function onLightDrop(e){
        e.preventDefault();
        $view.removeClass('droptarget');

        var dataTransfer = e.originalEvent.dataTransfer;
        var data = JSON.parse(
            dataTransfer.getData('application/x-bridge-light'));

        var existingLight = currentLights[data.number];
        if (existingLight){
            return;
        }

        addLightForModel(data);
    }

    function addLightForModel(model){
        var light = new SceneLight(model);

        currentLights[model.number] = light;
        //registerLight(light);
        $sceneLights.append(light.$view);
    }

    // function registerLight(light){
    //     light.find('.color-block').on('click', light, onColorBlockClicked);
    // }

    function onColorBlockClicked(e){
        console.log(e);
        console.log(e.data);

    }

    function transitionToColorControl(light){

    }

    function transitionFromColorControl(light){

    }

    init();

    return {
        '$view': $view
    };
});
