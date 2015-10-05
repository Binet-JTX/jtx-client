(function() {
    'use strict';

    angular
        .module('jtx.admin.tag')
        .factory('TagConverter', TagConverter);

    /** @ngInject */
    function TagConverter() {
        //Tags received from the API contain _type which are strings
        //To POST a new tag the API requires the id key associated with the _type
        //This function does the conversion
        return {
            keyFromType: function(type) {
                switch (type) {
                    case "JTX":
                        return {
                            value: 1,
                            display_name: "JTX"
                        };
                    case "Acteur":
                        return {
                            value: 2,
                            display_name: "Acteur"
                        };
                    case "Réalisateur":
                        return {
                            value: 3,
                            display_name: "Réalisateur"
                        };
                    case "Binet":
                        return {
                            value: 4,
                            display_name: "Binet"
                        };
                    case "Catégorie":
                        return {
                            value: 5,
                            display_name: "Catégorie"
                        };
                    case "Lieu":
                        return {
                            value: 6,
                            display_name: "Lieu"
                        };
                    case "Objet":
                        return {
                            value: 7,
                            display_name: "Objet"
                        };
                    case "Autre":
                        return {
                            value: 8,
                            display_name: "Autre"
                        };
                }
            }
        };
    }

})();
