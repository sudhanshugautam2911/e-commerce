export const ITEM_PER_PAGE = 9;

export function discountPrice(item) {
    return Math.round(item.price*(1-item.discountPercentage/100), 2)
}