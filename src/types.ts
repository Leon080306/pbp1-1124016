export type Menu = {
    createdAt: string;
    deskripsi: string;
    harga: number;
    id: string;
    kategori: Kategori;
    label: Label;
    nama: string;
    size: Size;
    updatedAt: string;
}

export type Label = 'vegan' | 'gluten_free' | 'halal' | 'low_cal';
export type Size = 'small' | 'medium' | 'large';
export type Kategori = 'minuman' | 'makanan';

export type AsyncDataState = 'pending' | 'error' | 'loading' | 'fulffiled';

export type CreateMenuPayload = {
    nama: string,
    deskripsi: string,
    harga: number,
    size: Size,
    label: Label,
    kategori: Kategori
}

export type EdigtMenuPayload = {
    id: string,
    nama: string,
    deskripsi: string,
    harga: number,
    size: Size,
    label: Label,
    kategori: Kategori
}