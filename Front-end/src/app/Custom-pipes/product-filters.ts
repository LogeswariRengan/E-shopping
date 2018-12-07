import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
    name: 'productFilter'
})

export class productFilterPipe implements PipeTransform {

    transform(productItems: any, colorFilters: any): any {
console.log("filter values",colorFilters)

        if (!productItems) return null;
        if (productItems && productItems.length) {
            return productItems.filter(products => {


                for (let iterate = colorFilters.values(), colorValue = null; (colorValue = iterate.next().value);) {
                    console.log("filter valuess", colorValue);
                    if (colorValue && products.productColor.toLowerCase().indexOf(colorValue.toLowerCase()) === -1) {
                        return false;

                    }
                }
                return true;
            })
        }


        // if (productItems && productItems.length) {
        //     return productItems.filter(products => {
        //         console.log(colorFilters)
        //         if (colorFilters && products.productColor.toLowerCase().indexOf(colorFilters[0].toLocaleLowerCase()) === -1) {
        //             return false;
        //         }
        //         return true;
        //     })
        // }

        else {
            return productItems;
        }






        // if (productItems && productItems.length) {

        //     return productItems.filter(products => {
        //         for (let color of colorFilters) {
        //             console.log("filer values", color.value)
        //             if (color && products.productColor.toLowerCase().indexOf(color.toLocaleLowerCase()) === -1) {
        //                 return false;
        //             }

        //         }
        //         // if (colorFilters && products.productColor.toLowerCase().indexOf(colorFilters[0].toLocaleLowerCase()) === -1) {
        //         //     return false;
        //         // }

        //         // if (products.productType === 'bag') {
        //         //     if (brandFilter && products.bagBrand.toLowerCase().indexOf(brandFilter.toLocaleLowerCase()) === -1) {
        //         //         return false;
        //         //     }
        //         // }
        //         return true;
        //     })
        // }
        // else {
        //     return productItems;
        // }
    }

}