

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var popup = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
    });

map.addOverlay(popup);

closer.onclick=function(){
    popup.setPosition(undefined);
    closer.blur();
    return false;
     },
    
    map.on ('singleclick',function (evt){
    content.innerHTML = '';
    var resolution = mapView.getResolution();
    
    var url = CircoElecto2022R.getSource().getFeatureInfoUrl(evt.coordinate,resolution, 'EPSG:3857',{
        'INFO_FORMAT': 'application/json',
        'propertyName':'state, cvs_Parti'
    });
    
    if (url){
        $.getJSON(url,function(data){
            var feature = data.features[0];
            var props = feature.properties;
            content.innerHTML = "<h5> State:</h5><p>" + props.state.toUpperCase() + "<h6> District:</h6><p>"
            props.district.toUpperCase() + "</p>";   
            popup.setPosition(evt.coordinate);
        })
    }else {
        popup.setPosition(undefined);
        }
                
    });

    