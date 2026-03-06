export type Book = {
    id: string;
    judul: string;
    deskripsi: string;
    tahun: string;
    kategori: Kategori;
    status: "available" | "borrowed";
    peminjam?: string | null;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export type Kategori = "majalah" | "komik" | "novel" | "";

export type BookState = "pending" | "loading" | "error" | "fulfilled";

export type CardProps = {
    id: string;
    judul: string;
    deskripsi: string;
    kategori: Kategori;
    imageUrl: string;
    status: "available" | "borrowed";
    peminjam?: string | null;
}

export type EditBookPayload = {
    id: string;
    judul: string;
    deskripsi: string;
    tahun: string;
    kategori: Kategori;
}

export type PinjamBukuPayload = {
    id: string;
    nama: string;
}