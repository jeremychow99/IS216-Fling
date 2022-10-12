
import { db } from './config.js'
import { collection, getDocs } from 'firebase/firestore'

const colRef = collection(db, 'testdata')

export { getDocs, colRef }
