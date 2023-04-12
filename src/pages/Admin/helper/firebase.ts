import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const removeCourse = async (courseId: string) => {
    const docRef: any = doc(db, "Courses", courseId);
    await deleteDoc(docRef)
}