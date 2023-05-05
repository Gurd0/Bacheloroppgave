import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const removeCourse = async (courseId: string) => {
    const docRef: any = doc(db, "Courses", courseId);
    await deleteDoc(docRef)
}
export const setDefaulfImage = async (img: string) => {
    await setDoc(doc(db, "defaultImage", "image"), {
        image: img
    })
}