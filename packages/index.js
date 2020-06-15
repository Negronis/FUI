import FButton from './FButton';
import FCard from './FCard';
const components = [
    FButton,FCard
]
const install = function (Vue) {
    if (install.installted) return;
    components.map(component => Vue.component(component.name, component));
}
if (typeof window !== undefined && window.Vue) {
    install(window.Vue);
}
export default {
    install,
    FButton,
	FCard
}