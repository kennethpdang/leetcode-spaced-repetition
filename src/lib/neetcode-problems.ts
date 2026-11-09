// NeetCode gives many problems its own name, so its folder names don't always match LeetCode's.
// This table maps those renamed NeetCode problems to their LeetCode number.
// Any NeetCode name not listed here is assumed to be the same as the LeetCode name (e.g. "binary-search").

export const LEETCODE_NUMBER_BY_NEETCODE_SLUG: Record<string, number> = {
  "duplicate-integer": 217, // Contains Duplicate
  "is-anagram": 242, // Valid Anagram
  "two-integer-sum": 1, // Two Sum
  "anagram-groups": 49, // Group Anagrams
  "top-k-elements-in-list": 347, // Top K Frequent Elements
  "string-encode-and-decode": 271, // Encode and Decode Strings
  "products-of-array-discluding-self": 238, // Product of Array Except Self
  "is-palindrome": 125, // Valid Palindrome
  "two-integer-sum-ii": 167, // Two Sum II Input Array Is Sorted
  "three-integer-sum": 15, // 3Sum
  "max-water-container": 11, // Container With Most Water
  "buy-and-sell-crypto": 121, // Best Time to Buy And Sell Stock
  "longest-substring-without-duplicates": 3, // Longest Substring Without Repeating Characters
  "longest-repeating-substring-with-replacement": 424, // Longest Repeating Character Replacement
  "permutation-string": 567, // Permutation In String
  "minimum-window-with-characters": 76, // Minimum Window Substring
  "validate-parentheses": 20, // Valid Parentheses
  "minimum-stack": 155, // Min Stack
  "search-2d-matrix": 74, // Search a 2D Matrix
  "eating-bananas": 875, // Koko Eating Bananas
  "find-target-in-rotated-sorted-array": 33, // Search In Rotated Sorted Array
  "reverse-a-linked-list": 206, // Reverse Linked List
  "merge-two-sorted-linked-lists": 21, // Merge Two Sorted Lists
  "reorder-linked-list": 143, // Reorder List
  "remove-node-from-end-of-linked-list": 19, // Remove Nth Node From End of List
  "copy-linked-list-with-random-pointer": 138, // Copy List With Random Pointer
  "linked-list-cycle-detection": 141, // Linked List Cycle
  "find-duplicate-integer": 287, // Find The Duplicate Number
  "merge-k-sorted-linked-lists": 23, // Merge K Sorted Lists
  "invert-a-binary-tree": 226, // Invert Binary Tree
  "depth-of-binary-tree": 104, // Maximum Depth of Binary Tree
  "binary-tree-diameter": 543, // Diameter of Binary Tree
  "same-binary-tree": 100, // Same Tree
  "subtree-of-a-binary-tree": 572, // Subtree of Another Tree
  "lowest-common-ancestor-in-binary-search-tree": 235, // Lowest Common Ancestor of a Binary Search Tree
  "level-order-traversal-of-binary-tree": 102, // Binary Tree Level Order Traversal
  "count-good-nodes-in-binary-tree": 1448, // Count Good Nodes In Binary Tree
  "valid-binary-search-tree": 98, // Validate Binary Search Tree
  "kth-smallest-integer-in-bst": 230, // Kth Smallest Element In a Bst
  "binary-tree-from-preorder-and-inorder-traversal": 105, // Construct Binary Tree From Preorder And Inorder Traversal
  "kth-largest-integer-in-a-stream": 703, // Kth Largest Element In a Stream
  "task-scheduling": 621, // Task Scheduler
  "design-twitter-feed": 355, // Design Twitter
  "find-median-in-a-data-stream": 295, // Find Median From Data Stream
  "combination-target-sum": 39, // Combination Sum
  "combination-target-sum-ii": 40, // Combination Sum II
  "search-for-word": 79, // Word Search
  "combinations-of-a-phone-number": 17, // Letter Combinations of a Phone Number
  "implement-prefix-tree": 208, // Implement Trie Prefix Tree
  "design-word-search-data-structure": 211, // Design Add And Search Words Data Structure
  "search-for-word-ii": 212, // Word Search II
  "count-number-of-islands": 200, // Number of Islands
  "islands-and-treasure": 286, // Walls And Gates
  "rotting-fruit": 994, // Rotting Oranges
  "valid-tree": 261, // Graph Valid Tree
  "count-connected-components": 323, // Number of Connected Components In An Undirected Graph
  "reconstruct-flight-path": 332, // Reconstruct Itinerary
  "min-cost-to-connect-points": 1584, // Min Cost to Connect All Points
  "foreign-dictionary": 269, // Alien Dictionary
  "cheapest-flight-path": 787, // Cheapest Flights Within K Stops
  "count-paths": 62, // Unique Paths
  "buy-and-sell-crypto-with-cooldown": 309, // Best Time to Buy And Sell Stock With Cooldown
  "longest-increasing-path-in-matrix": 329, // Longest Increasing Path In a Matrix
  "count-subsequences": 115, // Distinct Subsequences
  "merge-triplets-to-form-target": 1899, // Merge Triplets to Form Target Triplet
  "insert-new-interval": 57, // Insert Interval
  "meeting-schedule": 252, // Meeting Rooms
  "meeting-schedule-ii": 253, // Meeting Rooms II
  "minimum-interval-including-query": 1851, // Minimum Interval to Include Each Query
  "rotate-matrix": 48, // Rotate Image
  "set-zeroes-in-matrix": 73, // Set Matrix Zeroes
  "non-cyclical-number": 202, // Happy Number
  "count-squares": 2013, // Detect Squares
  "number-of-one-bits": 191, // Number of 1 Bits
  "pow-x-n": 50, // Pow(x, n)
};

// Every other LeetCode problem that NeetCode has, listed by LeetCode number.
// NeetCode uses the same URL name as LeetCode for these, so no rename is needed.
// Built from every problem NeetCode has a write-up for (github.com/neetcode-gh/leetcode, the articles and
// hints folders plus .problemSiteData.json). The older .problemSiteData.json alone misses hundreds of
// problems that are on neetcode.io, such as 229. Majority Element II. JavaScript course problems are left out.
// Any number missing from both tables is a LeetCode-only problem.
export const LEETCODE_NUMBERS_WITH_SAME_NEETCODE_SLUG: number[] = [
  2, // Add Two Numbers
  4, // Median of Two Sorted Arrays
  5, // Longest Palindromic Substring
  6, // Zigzag Conversion
  7, // Reverse Integer
  9, // Palindrome Number
  10, // Regular Expression Matching
  12, // Integer to Roman
  13, // Roman to Integer
  14, // Longest Common Prefix
  18, // 4Sum
  22, // Generate Parentheses
  24, // Swap Nodes in Pairs
  25, // Reverse Nodes in k-Group
  26, // Remove Duplicates from Sorted Array
  27, // Remove Element
  28, // Find the Index of the First Occurrence in a String
  31, // Next Permutation
  34, // Find First and Last Position of Element in Sorted Array
  35, // Search Insert Position
  36, // Valid Sudoku
  41, // First Missing Positive
  42, // Trapping Rain Water
  43, // Multiply Strings
  45, // Jump Game II
  46, // Permutations
  47, // Permutations II
  51, // N-Queens
  52, // N-Queens II
  53, // Maximum Subarray
  54, // Spiral Matrix
  55, // Jump Game
  56, // Merge Intervals
  58, // Length of Last Word
  59, // Spiral Matrix II
  61, // Rotate List
  63, // Unique Paths II
  64, // Minimum Path Sum
  66, // Plus One
  67, // Add Binary
  68, // Text Justification
  69, // Sqrt(x)
  70, // Climbing Stairs
  71, // Simplify Path
  72, // Edit Distance
  75, // Sort Colors
  77, // Combinations
  78, // Subsets
  80, // Remove Duplicates from Sorted Array II
  81, // Search in Rotated Sorted Array II
  83, // Remove Duplicates from Sorted List
  84, // Largest Rectangle in Histogram
  86, // Partition List
  88, // Merge Sorted Array
  90, // Subsets II
  91, // Decode Ways
  92, // Reverse Linked List II
  93, // Restore IP Addresses
  94, // Binary Tree Inorder Traversal
  95, // Unique Binary Search Trees II
  96, // Unique Binary Search Trees
  97, // Interleaving String
  99, // Recover Binary Search Tree
  101, // Symmetric Tree
  103, // Binary Tree Zigzag Level Order Traversal
  106, // Construct Binary Tree from Inorder and Postorder Traversal
  108, // Convert Sorted Array to Binary Search Tree
  110, // Balanced Binary Tree
  112, // Path Sum
  116, // Populating Next Right Pointers in Each Node
  118, // Pascal's Triangle
  119, // Pascal's Triangle II
  120, // Triangle
  122, // Best Time to Buy and Sell Stock II
  124, // Binary Tree Maximum Path Sum
  127, // Word Ladder
  128, // Longest Consecutive Sequence
  129, // Sum Root to Leaf Numbers
  130, // Surrounded Regions
  131, // Palindrome Partitioning
  133, // Clone Graph
  134, // Gas Station
  135, // Candy
  136, // Single Number
  139, // Word Break
  140, // Word Break II
  142, // Linked List Cycle II
  144, // Binary Tree Preorder Traversal
  145, // Binary Tree Postorder Traversal
  146, // LRU Cache
  147, // Insertion Sort List
  148, // Sort List
  149, // Max Points on a Line
  150, // Evaluate Reverse Polish Notation
  152, // Maximum Product Subarray
  153, // Find Minimum in Rotated Sorted Array
  159, // Longest Substring with At Most Two Distinct Characters
  160, // Intersection of Two Linked Lists
  161, // One Edit Distance
  162, // Find Peak Element
  163, // Missing Ranges
  168, // Excel Sheet Column Title
  169, // Majority Element
  173, // Binary Search Tree Iterator
  179, // Largest Number
  186, // Reverse Words in a String II
  187, // Repeated DNA Sequences
  189, // Rotate Array
  190, // Reverse Bits
  198, // House Robber
  199, // Binary Tree Right Side View
  201, // Bitwise AND of Numbers Range
  203, // Remove Linked List Elements
  204, // Count Primes
  205, // Isomorphic Strings
  207, // Course Schedule
  209, // Minimum Size Subarray Sum
  210, // Course Schedule II
  213, // House Robber II
  215, // Kth Largest Element in an Array
  219, // Contains Duplicate II
  221, // Maximal Square
  225, // Implement Stack using Queues
  227, // Basic Calculator II
  229, // Majority Element II
  231, // Power of Two
  232, // Implement Queue using Stacks
  234, // Palindrome Linked List
  236, // Lowest Common Ancestor of a Binary Tree
  239, // Sliding Window Maximum
  247, // Strobogrammatic Number II
  249, // Group Shifted Strings
  250, // Count Univalue Subtrees
  254, // Factor Combinations
  255, // Verify Preorder Sequence in Binary Search Tree
  256, // Paint House
  260, // Single Number III
  263, // Ugly Number
  265, // Paint House II
  266, // Palindrome Permutation
  268, // Missing Number
  270, // Closest Binary Search Tree Value
  272, // Closest Binary Search Tree Value II
  276, // Paint Fence
  277, // Find the Celebrity
  278, // First Bad Version
  279, // Perfect Squares
  280, // Wiggle Sort
  281, // Zigzag Iterator
  283, // Move Zeroes
  290, // Word Pattern
  297, // Serialize and Deserialize Binary Tree
  298, // Binary Tree Longest Consecutive Sequence
  300, // Longest Increasing Subsequence
  303, // Range Sum Query - Immutable
  304, // Range Sum Query 2D - Immutable
  305, // Number of Islands II
  307, // Range Sum Query - Mutable
  310, // Minimum Height Trees
  311, // Sparse Matrix Multiplication
  312, // Burst Balloons
  314, // Binary Tree Vertical Order Traversal
  317, // Shortest Distance from All Buildings
  322, // Coin Change
  333, // Largest BST Subtree
  337, // House Robber III
  338, // Counting Bits
  340, // Longest Substring with At Most K Distinct Characters
  341, // Flatten Nested List Iterator
  342, // Power of Four
  343, // Integer Break
  344, // Reverse String
  346, // Moving Average from Data Stream
  348, // Design Tic-Tac-Toe
  349, // Intersection of Two Arrays
  352, // Data Stream as Disjoint Intervals
  353, // Design Snake Game
  354, // Russian Doll Envelopes
  358, // Rearrange String k Distance Apart
  366, // Find Leaves of Binary Tree
  367, // Valid Perfect Square
  368, // Largest Divisible Subset
  369, // Plus One Linked List
  371, // Sum of Two Integers
  374, // Guess Number Higher or Lower
  377, // Combination Sum IV
  380, // Insert Delete GetRandom O(1)
  383, // Ransom Note
  387, // First Unique Character in a String
  389, // Find the Difference
  392, // Is Subsequence
  394, // Decode String
  399, // Evaluate Division
  402, // Remove K Digits
  406, // Queue Reconstruction by Height
  408, // Valid Word Abbreviation
  409, // Longest Palindrome
  410, // Split Array Largest Sum
  416, // Partition Equal Subset Sum
  417, // Pacific Atlantic Water Flow
  422, // Valid Word Square
  427, // Construct Quad Tree
  428, // Serialize and Deserialize N-ary Tree
  431, // Encode N-ary Tree to Binary Tree
  435, // Non-overlapping Intervals
  438, // Find All Anagrams in a String
  439, // Ternary Expression Parser
  440, // K-th Smallest in Lexicographical Order
  441, // Arranging Coins
  442, // Find All Duplicates in an Array
  443, // String Compression
  445, // Add Two Numbers II
  446, // Arithmetic Slices II - Subsequence
  448, // Find All Numbers Disappeared in an Array
  450, // Delete Node in a BST
  451, // Sort Characters By Frequency
  452, // Minimum Number of Arrows to Burst Balloons
  455, // Assign Cookies
  456, // 132 Pattern
  460, // LFU Cache
  463, // Island Perimeter
  472, // Concatenated Words
  473, // Matchsticks to Square
  474, // Ones and Zeroes
  480, // Sliding Window Median
  484, // Find Permutation
  485, // Max Consecutive Ones
  487, // Max Consecutive Ones II
  490, // The Maze
  494, // Target Sum
  496, // Next Greater Element I
  499, // The Maze III
  502, // IPO
  505, // The Maze II
  513, // Find Bottom Left Tree Value
  514, // Freedom Trail
  515, // Find Largest Value in Each Tree Row
  516, // Longest Palindromic Subsequence
  518, // Coin Change II
  523, // Continuous Subarray Sum
  525, // Contiguous Array
  528, // Random Pick with Weight
  531, // Lonely Pixel I
  535, // Encode and Decode TinyURL
  538, // Convert BST to Greater Tree
  540, // Single Element in a Sorted Array
  545, // Boundary of Binary Tree
  547, // Number of Provinces
  549, // Binary Tree Longest Consecutive Sequence II
  552, // Student Attendance Record II
  554, // Brick Wall
  557, // Reverse Words in a String III
  560, // Subarray Sum Equals K
  576, // Out of Boundary Paths
  582, // Kill Process
  588, // Design In-Memory File System
  590, // N-ary Tree Postorder Traversal
  604, // Design Compressed String Iterator
  605, // Can Place Flowers
  606, // Construct String from Binary Tree
  616, // Add Bold Tag in String
  617, // Merge Two Binary Trees
  622, // Design Circular Queue
  624, // Maximum Distance in Arrays
  629, // K Inverse Pairs Array
  642, // Design Search Autocomplete System
  644, // Maximum Average Subarray II
  645, // Set Mismatch
  646, // Maximum Length of Pair Chain
  647, // Palindromic Substrings
  649, // Dota2 Senate
  651, // 4 Keys Keyboard
  652, // Find Duplicate Subtrees
  658, // Find K Closest Elements
  661, // Image Smoother
  662, // Maximum Width of Binary Tree
  665, // Non-decreasing Array
  669, // Trim a Binary Search Tree
  673, // Number of Longest Increasing Subsequence
  678, // Valid Parenthesis String
  680, // Valid Palindrome II
  682, // Baseball Game
  684, // Redundant Connection
  691, // Stickers to Spell Word
  694, // Number of Distinct Islands
  695, // Max Area of Island
  698, // Partition to K Equal Sum Subsets
  700, // Search in a Binary Search Tree
  701, // Insert into a Binary Search Tree
  704, // Binary Search
  705, // Design HashSet
  706, // Design HashMap
  707, // Design Linked List
  708, // Insert into a Sorted Circular Linked List
  713, // Subarray Product Less Than K
  716, // Max Stack
  721, // Accounts Merge
  723, // Candy Crush
  724, // Find Pivot Index
  725, // Split Linked List in Parts
  729, // My Calendar I
  733, // Flood Fill
  734, // Sentence Similarity
  735, // Asteroid Collision
  739, // Daily Temperatures
  740, // Delete and Earn
  741, // Cherry Pickup
  743, // Network Delay Time
  745, // Prefix and Suffix Search
  746, // Min Cost Climbing Stairs
  752, // Open the Lock
  760, // Find Anagram Mappings
  763, // Partition Labels
  767, // Reorganize String
  772, // Basic Calculator III
  778, // Swim in Rising Water
  779, // K-th Symbol in Grammar
  783, // Minimum Distance Between BST Nodes
  785, // Is Graph Bipartite
  791, // Custom Sort String
  799, // Champagne Tower
  802, // Find Eventual Safe States
  805, // Split Array With Same Average
  815, // Bus Routes
  837, // New 21 Game
  838, // Push Dominoes
  844, // Backspace String Compare
  846, // Hand of Straights
  853, // Car Fleet
  857, // Minimum Cost to Hire K Workers
  860, // Lemonade Change
  861, // Score After Flipping Matrix
  867, // Transpose Matrix
  872, // Leaf-Similar Trees
  876, // Middle of the Linked List
  877, // Stone Game
  879, // Profitable Schemes
  881, // Boats to Save People
  884, // Uncommon Words from Two Sentences
  894, // All Possible Full Binary Trees
  895, // Maximum Frequency Stack
  896, // Monotonic Array
  901, // Online Stock Span
  904, // Fruit Into Baskets
  905, // Sort Array By Parity
  907, // Sum of Subarray Minimums
  909, // Snakes and Ladders
  912, // Sort an Array
  916, // Word Subsets
  918, // Maximum Sum Circular Subarray
  920, // Number of Music Playlists
  926, // Flip String to Monotone Increasing
  929, // Unique Email Addresses
  930, // Binary Subarrays With Sum
  931, // Minimum Falling Path Sum
  934, // Shortest Bridge
  935, // Knight Dialer
  938, // Range Sum of BST
  946, // Validate Stack Sequences
  948, // Bag of Tokens
  950, // Reveal Cards In Increasing Order
  951, // Flip Equivalent Binary Trees
  953, // Verifying an Alien Dictionary
  958, // Check Completeness of a Binary Tree
  973, // K Closest Points to Origin
  974, // Subarray Sums Divisible by K
  977, // Squares of a Sorted Array
  978, // Longest Turbulent Subarray
  979, // Distribute Coins in Binary Tree
  981, // Time Based Key-Value Store
  983, // Minimum Cost For Tickets
  986, // Interval List Intersections
  988, // Smallest String Starting From Leaf
  989, // Add to Array-Form of Integer
  992, // Subarrays with K Different Integers
  997, // Find the Town Judge
  1002, // Find Common Characters
  1004, // Max Consecutive Ones III
  1011, // Capacity To Ship Packages Within D Days
  1020, // Number of Enclaves
  1029, // Two City Scheduling
  1035, // Uncrossed Lines
  1041, // Robot Bounded In Circle
  1043, // Partition Array for Maximum Sum
  1046, // Last Stone Weight
  1048, // Longest String Chain
  1049, // Last Stone Weight II
  1051, // Height Checker
  1052, // Grumpy Bookstore Owner
  1055, // Shortest Way to Form String
  1056, // Confusing Number
  1057, // Campus Bikes
  1059, // All Paths from Source Lead to Destination
  1060, // Missing Element in Sorted Array
  1071, // Greatest Common Divisor of Strings
  1074, // Number of Submatrices That Sum to Target
  1086, // High Five
  1087, // Brace Expansion
  1091, // Shortest Path in Binary Matrix
  1092, // Shortest Common Supersequence
  1094, // Car Pooling
  1095, // Find in Mountain Array
  1100, // Find K-Length Substrings With No Repeated Characters
  1120, // Maximum Average Subtree
  1122, // Relative Sort Array
  1129, // Shortest Path with Alternating Colors
  1133, // Largest Unique Number
  1134, // Armstrong Number
  1136, // Parallel Courses
  1137, // N-th Tribonacci Number
  1140, // Stone Game II
  1143, // Longest Common Subsequence
  1150, // Check If a Number Is Majority Element in a Sorted Array
  1152, // Analyze User Website Visit Pattern
  1155, // Number of Dice Rolls With Target Sum
  1160, // Find Words That Can Be Formed by Characters
  1162, // As Far from Land as Possible
  1165, // Single-Row Keyboard
  1167, // Minimum Cost to Connect Sticks
  1180, // Count Substrings with Only One Distinct Letter
  1183, // Maximum Number of Ones
  1189, // Maximum Number of Balloons
  1197, // Minimum Knight Moves
  1198, // Find Smallest Common Element in All Rows
  1203, // Sort Items by Groups Respecting Dependencies
  1208, // Get Equal Substrings Within Budget
  1209, // Remove All Adjacent Duplicates in String II
  1214, // Two Sum BSTs
  1219, // Path with Maximum Gold
  1220, // Count Vowels Permutation
  1228, // Missing Number In Arithmetic Progression
  1231, // Divide Chocolate
  1233, // Remove Sub-Folders from the Filesystem
  1235, // Maximum Profit in Job Scheduling
  1236, // Web Crawler
  1239, // Maximum Length of a Concatenated String with Unique Characters
  1244, // Design A Leaderboard
  1249, // Minimum Remove to Make Valid Parentheses
  1254, // Number of Closed Islands
  1255, // Maximum Score Words Formed by Letters
  1259, // Handshakes That Don't Cross
  1260, // Shift 2D Grid
  1265, // Print Immutable Linked List in Reverse
  1267, // Count Servers that Communicate
  1268, // Search Suggestions System
  1269, // Number of Ways to Stay in the Same Place After Some Steps
  1272, // Remove Interval
  1288, // Remove Covered Intervals
  1289, // Minimum Falling Path Sum II
  1291, // Sequential Digits
  1299, // Replace Elements with Greatest Element on Right Side
  1325, // Delete Leaves With a Given Value
  1335, // Minimum Difficulty of a Job Schedule
  1343, // Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold
  1359, // Count All Valid Pickup and Delivery Options
  1361, // Validate Binary Tree Nodes
  1376, // Time Needed to Inform All Employees
  1383, // Maximum Performance of a Team
  1394, // Find Lucky Integer in an Array
  1396, // Design Underground System
  1405, // Longest Happy String
  1406, // Stone Game III
  1408, // String Matching in an Array
  1422, // Maximum Score After Splitting a String
  1423, // Maximum Points You Can Obtain from Cards
  1425, // Constrained Subsequence Sum
  1426, // Counting Elements
  1427, // Perform String Shifts
  1429, // First Unique Number
  1436, // Destination City
  1438, // Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
  1442, // Count Triplets That Can Form Two Arrays of Equal XOR
  1443, // Minimum Time to Collect All Apples in a Tree
  1456, // Maximum Number of Vowels in a Substring of Given Length
  1457, // Pseudo-Palindromic Paths in a Binary Tree
  1461, // Check If a String Contains All Binary Codes of Size K
  1462, // Course Schedule IV
  1463, // Cherry Pickup II
  1466, // Reorder Routes to Make All Paths Lead to the City Zero
  1470, // Shuffle the Array
  1472, // Design Browser History
  1474, // Delete N Nodes After M Nodes of a Linked List
  1481, // Least Number of Unique Integers after K Removals
  1489, // Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree
  1490, // Clone N-ary Tree
  1496, // Path Crossing
  1498, // Number of Subsequences That Satisfy the Given Sum Condition
  1506, // Find Root of N-Ary Tree
  1512, // Number of Good Pairs
  1514, // Path with Maximum Probability
  1522, // Diameter of N-Ary Tree
  1523, // Count Odd Numbers in an Interval Range
  1524, // Number of Sub-arrays With Odd Sum
  1526, // Minimum Number of Increments on Subarrays to Form a Target Array
  1531, // String Compression II
  1533, // Find the Index of the Large Integer
  1538, // Guess the Majority in a Hidden Array
  1544, // Make The String Great
  1547, // Minimum Cost to Cut a Stick
  1553, // Minimum Number of Days to Eat N Oranges
  1557, // Minimum Number of Vertices to Reach All Nodes
  1572, // Matrix Diagonal Sum
  1578, // Minimum Time to Make Rope Colorful
  1579, // Remove Max Number of Edges to Keep Graph Fully Traversable
  1590, // Make Sum Divisible by P
  1598, // Crawler Log Folder
  1603, // Design Parking System
  1608, // Special Array With X Elements Greater Than or Equal X
  1609, // Even Odd Tree
  1611, // Minimum One Bit Operations to Make Integers Zero
  1614, // Maximum Nesting Depth of the Parentheses
  1624, // Largest Substring Between Two Equal Characters
  1626, // Best Team With No Conflicts
  1631, // Path With Minimum Effort
  1636, // Sort Array by Increasing Frequency
  1637, // Widest Vertical Area Between Two Points Containing No Points
  1639, // Number of Ways to Form a Target String Given a Dictionary
  1642, // Furthest Building You Can Reach
  1647, // Minimum Deletions to Make Character Frequencies Unique
  1650, // Lowest Common Ancestor of a Binary Tree III
  1658, // Minimum Operations to Reduce X to Zero
  1662, // Check If Two String Arrays are Equivalent
  1669, // Merge In Between Linked Lists
  1675, // Minimize Deviation in Array
  1684, // Count the Number of Consistent Strings
  1685, // Sum of Absolute Differences in a Sorted Array
  1688, // Count of Matches in Tournament
  1700, // Number of Students Unable to Eat Lunch
  1701, // Average Waiting Time
  1716, // Calculate Money in Leetcode Bank
  1721, // Swapping Nodes in a Linked List
  1727, // Largest Submatrix With Rearrangements
  1750, // Minimum Length of String After Deleting Similar Ends
  1752, // Check if Array Is Sorted and Rotated
  1758, // Minimum Changes To Make Alternating Binary String
  1762, // Buildings With an Ocean View
  1768, // Merge Strings Alternately
  1769, // Minimum Number of Operations to Move All Balls to Each Box
  1793, // Maximum Score of a Good Subarray
  1799, // Maximize Score After N Operations
  1800, // Maximum Ascending Subarray Sum
  1822, // Sign of the Product of an Array
  1834, // Single-Threaded CPU
  1838, // Frequency of the Most Frequent Element
  1845, // Seat Reservation Manager
  1846, // Maximum Element After Decreasing and Rearranging
  1849, // Splitting a String Into Descending Consecutive Values
  1856, // Maximum Subarray Min-Product
  1857, // Largest Color Value in a Directed Graph
  1861, // Rotating the Box
  1863, // Sum of All Subset XOR Totals
  1866, // Number of Ways to Rearrange Sticks With K Sticks Visible
  1871, // Jump Game VII
  1882, // Process Tasks Using Servers
  1888, // Minimum Number of Flips to Make the Binary String Alternating
  1897, // Redistribute Characters to Make All Strings Equal
  1898, // Maximum Number of Removable Characters
  1903, // Largest Odd Number in String
  1905, // Count Sub Islands
  1911, // Maximum Alternating Subsequence Sum
  1913, // Maximum Product Difference Between Two Pairs
  1921, // Eliminate Maximum Number of Monsters
  1929, // Concatenation of Array
  1930, // Unique Length-3 Palindromic Subsequences
  1937, // Maximum Number of Points with Cost
  1944, // Number of Visible People in a Queue
  1958, // Check if Move is Legal
  1963, // Minimum Number of Swaps to Make the String Balanced
  1964, // Find the Longest Valid Obstacle Course at Each Position
  1968, // Array With Elements Not Equal to Average of Neighbors
  1980, // Find Unique Binary String
  1984, // Minimum Difference Between Highest and Lowest of K Scores
  1985, // Find the Kth Largest Integer in the Array
  1993, // Operations on Tree
  2001, // Number of Pairs of Interchangeable Rectangles
  2002, // Maximum Product of the Length of Two Palindromic Subsequences
  2009, // Minimum Number of Operations to Make Array Continuous
  2017, // Grid Game
  2028, // Find Missing Observations
  2037, // Minimum Number of Moves to Seat Everyone
  2038, // Remove Colored Pieces if Both Neighbors are the Same Color
  2040, // Kth Smallest Product of Two Sorted Arrays
  2050, // Parallel Courses III
  2053, // Kth Distinct String in an Array
  2073, // Time Needed to Buy Tickets
  2092, // Find All People With Secret
  2101, // Detonate the Maximum Bombs
  2108, // Find First Palindromic String in the Array
  2125, // Number of Laser Beams in a Bank
  2130, // Maximum Twin Sum of a Linked List
  2140, // Solving Questions With Brainpower
  2147, // Number of Ways to Divide a Long Corridor
  2149, // Rearrange Array Elements by Sign
  2185, // Counting Words With a Given Prefix
  2191, // Sort the Jumbled Numbers
  2206, // Divide Array Into Equal Pairs
  2215, // Find the Difference of Two Arrays
  2218, // Maximum Value of K Coins From Piles
  2251, // Number of Flowers in Full Bloom
  2264, // Largest 3-Same-Digit Number in String
  2270, // Number of Ways to Split Array
  2300, // Successful Pairs of Spells and Potions
  2306, // Naming a Company
  2331, // Evaluate Boolean Binary Tree
  2333, // Minimum Sum of Squared Difference
  2348, // Number of Zero-Filled Subarrays
  2353, // Design a Food Rating System
  2359, // Find Closest Node to Given Two Nodes
  2364, // Count Number of Bad Pairs
  2369, // Check if There is a Valid Partition For The Array
  2370, // Longest Ideal Subsequence
  2373, // Largest Local Values in a Matrix
  2379, // Minimum Recolors to Get K Consecutive Black Blocks
  2381, // Shifting Letters II
  2390, // Removing Stars From a String
  2392, // Build a Matrix With Conditions
  2402, // Meeting Rooms III
  2405, // Optimal Partition of String
  2407, // Longest Increasing Subsequence II
  2418, // Sort the People
  2421, // Number of Good Paths
  2439, // Minimize Maximum of Array
  2460, // Apply Operations to an Array
  2466, // Count Ways To Build Good Strings
  2477, // Minimum Fuel Cost to Report to the Capital
  2483, // Minimum Penalty for a Shop
  2486, // Append Characters to String to Make Subsequence
  2487, // Remove Nodes From Linked List
  2490, // Circular Sentence
  2492, // Minimum Score of a Path Between Two Cities
  2542, // Maximum Subsequence Score
  2551, // Put Marbles in Bags
  2558, // Take Gifts From the Richest Pile
  2559, // Count Vowel Strings in Ranges
  2597, // The Number of Beautiful Subsets
  2610, // Convert an Array Into a 2D Array With Conditions
  2616, // Minimize the Maximum Difference of Pairs
  2678, // Number of Senior Citizens
  2706, // Buy Two Chocolates
  2707, // Extra Characters in a String
  2709, // Greatest Common Divisor Traversal
  2742, // Painting the Walls
  2780, // Minimum Index of a Valid Split
  2807, // Insert Greatest Common Divisors in Linked List
  2812, // Find the Safest Path in a Grid
  2864, // Maximum Odd Binary Number
  2870, // Minimum Number of Operations to Make Array Empty
  2929, // Distribute Candies Among Children II
  2958, // Length of Longest Subarray With at Most K Frequency
  2962, // Count Subarrays Where Max Element Appears at Least K Times
  2965, // Find Missing and Repeated Values
  2966, // Divide Array Into Arrays With Max Difference
  2971, // Find Polygon With the Largest Perimeter
  3042, // Count Prefix and Suffix Pairs I
  3068, // Find the Maximum Sum of Node Values
  3105, // Longest Strictly Increasing or Strictly Decreasing Subarray
  3110, // Score of a String
  3133, // Minimum Array End
  3151, // Special Array I
  3264, // Final Array State After K Multiplication Operations I
  3434, // Maximum Frequency After Subarray Operation
  3442, // Maximum Difference Between Even and Odd Frequency I
  3572, // Maximize Y‑Sum by Picking a Triplet of Distinct X‑Values
];

// LEETCODE_NUMBER_BY_NEETCODE_SLUG flipped around, so a LeetCode number can find its NeetCode name.
function buildNeetcodeSlugByLeetcodeNumber(): Map<number, string> {
  const slugByNumber = new Map<number, string>();
  const neetcodeSlugs = Object.keys(LEETCODE_NUMBER_BY_NEETCODE_SLUG);
  for (let slugIndex = 0; slugIndex < neetcodeSlugs.length; slugIndex++) {
    const neetcodeSlug = neetcodeSlugs[slugIndex];
    slugByNumber.set(LEETCODE_NUMBER_BY_NEETCODE_SLUG[neetcodeSlug], neetcodeSlug);
  }
  return slugByNumber;
}

const NEETCODE_SLUG_BY_LEETCODE_NUMBER = buildNeetcodeSlugByLeetcodeNumber();
const SAME_SLUG_NUMBERS = new Set(LEETCODE_NUMBERS_WITH_SAME_NEETCODE_SLUG);

// The NeetCode URL name for a LeetCode problem, or null if NeetCode doesn't have it.
export function findNeetcodeSlug(problemNumber: number, leetcodeSlug: string): string | null {
  const renamedSlug = NEETCODE_SLUG_BY_LEETCODE_NUMBER.get(problemNumber);
  if (renamedSlug) {
    return renamedSlug;
  }
  if (SAME_SLUG_NUMBERS.has(problemNumber)) {
    return leetcodeSlug;
  }
  return null;
}

// Where a problem's title links to: NeetCode when it has the problem, LeetCode otherwise.
export function getProblemUrl(problemNumber: number, leetcodeSlug: string): string {
  const neetcodeSlug = findNeetcodeSlug(problemNumber, leetcodeSlug);
  if (neetcodeSlug) {
    return `https://neetcode.io/problems/${neetcodeSlug}`;
  }
  return `https://leetcode.com/problems/${leetcodeSlug}/`;
}
