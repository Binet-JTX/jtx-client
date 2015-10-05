(function() {
    'use strict';

    angular
        .module('jtx.admin.tag')
        .controller('AdminTagEditController', AdminTagEditController);

    /** @ngInject */
    function AdminTagEditController($resource, Tag, TagConverter, $log) {
        var vm = this;

        vm.tags = Tag.query();

        vm.showSuccess = false;
        vm.showErrors = false;

        vm.editTag = function(selectedTag) {
            selectedTag.key = TagConverter.keyFromType(selectedTag._type);
            $log.debug(selectedTag);
            Tag.update(selectedTag).$promise.then(function(result) {
                vm.showSuccess = true;
                vm.success = "Le tag n°" + selectedTag.id + " a été ajouté avec succès !";
            }, function(errors) {
                vm.showErrors = true;
                vm.errors = "Une erreur est survenue lors de la modification du tag.";
                $log.error(errors);
            });
        };
    }
    
})();
