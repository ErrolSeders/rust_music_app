use std::ops::Index;
use std::convert::From;

#[cfg(test)]
mod tests {
    use super::*;

    #[cfg(test)]
    mod tests {
        use super::*;

        #[test]
        fn test_rotate_left() {
            let mut circular_vec = CircularVec::new(vec![1, 2, 3, 4, 5]);
            circular_vec.rotate(2);
            assert_eq!(circular_vec.inner, vec![3, 4, 5, 1, 2]);
        }

        #[test]
        fn test_rotate_right() {
            let mut circular_vec = CircularVec::new(vec![1, 2, 3, 4, 5]);
            circular_vec.rotate(-2);
            assert_eq!(circular_vec.inner, vec![4, 5, 1, 2, 3]);
        }

        #[test]
        fn test_rotate_zero() {
            let mut circular_vec = CircularVec::new(vec![1, 2, 3, 4, 5]);
            circular_vec.rotate(0);
            assert_eq!(circular_vec.inner, vec![1, 2, 3, 4, 5]);
        }

        #[test]
        fn test_rotate_large_positive() {
            let mut circular_vec = CircularVec::new(vec![1, 2, 3, 4, 5]);
            circular_vec.rotate(101);
            assert_eq!(circular_vec.inner, vec![2, 3, 4, 5, 1]);
        }

        #[test]
        fn test_rotate_large_negative() {
            let mut circular_vec = CircularVec::new(vec![1, 2, 3, 4, 5]);
            circular_vec.rotate(-101);
            assert_eq!(circular_vec.inner, vec![5, 1, 2, 3, 4]);
        }
    }

    #[test]
    fn test_index() {
        let circular_vec = CircularVec::new(vec![1, 2, 3, 4, 5]);
        assert_eq!(circular_vec[0], 1);
        assert_eq!(circular_vec[6], 2);
        assert_eq!(circular_vec[7], 3);
        assert_eq!(circular_vec[8], 4);
        assert_eq!(circular_vec[10], 1);
        assert_eq!(circular_vec[246], 2);
    }

}


#[derive(Debug, Clone, PartialEq)]
pub struct CircularVec<T> {
    inner: Vec<T>,
}

impl<T> CircularVec<T> {
    pub fn new(inner: Vec<T>) -> Self {
        Self { inner }
    }
    
    pub fn rotate(&mut self, amount: isize){
        let len = self.inner.len() as isize;
        let amount = amount.rem_euclid(len);
        println!("amount: {}", amount);
        self.inner.rotate_left(amount as usize);
    }

    pub fn into_vec(self) -> Vec<T> {
        self.inner
    } 
} 

impl<T> Index<usize> for CircularVec<T> {
    type Output = T;

    fn index(&self, index: usize) -> &Self::Output {
        let len = self.inner.len();
        &self.inner[index % len]
    }
}

impl<T> PartialEq<Vec<T>> for CircularVec<T> where T: PartialEq {
    fn eq(&self, other: &Vec<T>) -> bool {
        &self.inner == other 
    }
}




