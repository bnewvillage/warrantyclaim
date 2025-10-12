
export function renderBrandsDropdown(brands, parentElement, position = "afterbegin") {
        const renderBrands = brands.map(brandDropdownTemplateFn);
    parentElement.insertAdjacentHTML(position, renderBrands.join(""));
}

export function brandDropdownTemplateFn(brand){
    return `<option value="${brand.name}">${brand.name}</option>`;
}

