export function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    nums1.slice(0, -m)
    nums1.push(...nums2)
    nums1.sort()
};
console.log(merge([12,4,2,4],1,[2,6,7], 7))