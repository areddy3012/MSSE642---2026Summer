class InvalidTriangleException(Exception):
    """Exception for invalid triangles"""
    pass


class Triangle:
    """Triangle classification model"""
    
    def __init__(self, side_a, side_b, side_c):
        self.side_a = side_a
        self.side_b = side_b
        self.side_c = side_c
        
    def is_valid(self):
        """Check if triangle is valid using triangle inequality theorem"""
        # All sides must be positive
        if self.side_a <= 0 or self.side_b <= 0 or self.side_c <= 0:
            return False
        
        # Triangle inequality theorem: sum of any two sides > third side
        if (self.side_a + self.side_b <= self.side_c or
            self.side_a + self.side_c <= self.side_b or
            self.side_b + self.side_c <= self.side_a):
            return False
        
        return True
    
    def get_type(self):
        """Classify triangle as Equilateral, Isosceles, or Scalene"""
        if not self.is_valid():
            raise InvalidTriangleException("Invalid triangle")
        
        # Check for equilateral (all sides equal)
        if self.side_a == self.side_b == self.side_c:
            return "Equilateral"
        
        # Check for isosceles (two sides equal)
        if (self.side_a == self.side_b or 
            self.side_b == self.side_c or 
            self.side_a == self.side_c):
            return "Isosceles"
        
        # Otherwise scalene
        return "Scalene"
