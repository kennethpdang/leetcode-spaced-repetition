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
// Built from NeetCode's own problem list (github.com/neetcode-gh/leetcode, .problemSiteData.json).
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
  24, // Swap Nodes In Pairs
  25, // Reverse Nodes In K Group
  26, // Remove Duplicates From Sorted Array
  27, // Remove Element
  28, // Find The Index of The First Occurrence in a String
  34, // Find First And Last Position of Element In Sorted Array
  35, // Search Insert Position
  36, // Valid Sudoku
  41, // First Missing Positive
  42, // Trapping Rain Water
  43, // Multiply Strings
  45, // Jump Game II
  46, // Permutations
  47, // Permutations II
  51, // N Queens
  52, // N Queens II
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
  80, // Remove Duplicates From Sorted Array II
  81, // Search In Rotated Sorted Array II
  83, // Remove Duplicates From Sorted List
  84, // Largest Rectangle In Histogram
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
  101, // Symmetric Tree 
  103, // Binary Tree Zigzag Level Order Traversal
  106, // Construct Binary Tree from Inorder and Postorder Traversal
  108, // Convert Sorted Array to Binary Search Tree
  110, // Balanced Binary Tree
  112, // Path Sum
  116, // Populating Next Right Pointers In Each Node
  118, // Pascals Triangle
  120, // Triangle
  122, // Best Time to Buy And Sell Stock II
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
  144, // Binary Tree Preorder Traversal
  145, // Binary Tree Postorder Traversal
  146, // LRU Cache
  147, // Insertion Sort List
  148, // Sort List
  149, // Maximum Points on a Line
  150, // Evaluate Reverse Polish Notation
  152, // Maximum Product Subarray
  153, // Find Minimum In Rotated Sorted Array
  160, // Intersection of Two Linked Lists
  162, // Find Peak Element
  168, // Excel Sheet Column Title
  169, // Majority Element
  173, // Binary Search Tree Iterator
  179, // Largest Number
  187, // Repeated DNA Sequences
  189, // Rotate Array
  190, // Reverse Bits
  198, // House Robber
  199, // Binary Tree Right Side View
  203, // Remove Linked List Elements
  205, // Isomorphic Strings
  207, // Course Schedule
  209, // Minimum Size Subarray Sum
  210, // Course Schedule II
  213, // House Robber II
  215, // Kth Largest Element In An Array
  219, // Contains Duplicate II
  221, // Maximal Square
  225, // Implement Stack Using Queues
  234, // Palindrome Linked List
  239, // Sliding Window Maximum
  256, // Paint House
  263, // Ugly Number
  268, // Missing Number
  279, // Perfect Squares
  280, // Wiggle Sort
  283, // Move Zeroes
  290, // Word Pattern
  297, // Serialize And Deserialize Binary Tree
  300, // Longest Increasing Subsequence
  303, // Range Sum Query - Immutable
  304, // Range Sum Query 2D Immutable
  312, // Burst Balloons
  322, // Coin Change
  337, // House Robber III
  338, // Counting Bits
  343, // Integer Break
  344, // Reverse String
  352, // Data Stream as Disjoint Intervals
  367, // Valid Perfect Square
  371, // Sum of Two Integers
  374, // Guess Number Higher Or Lower
  377, // Combination Sum IV
  380, // Insert Delete Get Random O(1)
  392, // Is Subsequence
  394, // Decode String
  399, // Evaluate Division
  402, // Remove K Digits
  410, // Split Array Largest Sum
  416, // Partition Equal Subset Sum
  417, // Pacific Atlantic Water Flow
  427, // Construct Quad Tree
  435, // Non Overlapping Intervals
  438, // Find All Anagrams in a String
  441, // Arranging Coins
  448, // Find All Numbers Disappeared in An Array
  450, // Delete Node in a BST
  456, // 132 Pattern
  460, // LFU Cache
  463, // Island Perimeter
  472, // Concatenated Words
  473, // Matchsticks to Square
  474, // Ones and Zeroes
  494, // Target Sum
  496, // Next Greater Element I
  502, // IPO
  513, // Find Bottom Left Tree Value
  516, // Longest Palindromic Subsequence
  518, // Coin Change II
  523, // Continuous Subarray Sum
  535, // Encode and Decode TinyURL
  538, // Convert Bst to Greater Tree
  540, // Single Element in a Sorted Array
  554, // Brick Wall
  560, // Subarray Sum Equals K
  605, // Can Place Flowers
  606, // Construct String From Binary Tree
  617, // Merge Two Binary Trees
  622, // Design Circular Queue
  646, // Maximum Length of Pair Chain
  647, // Palindromic Substrings
  649, // Dota2 Senate
  652, // Find Duplicate Subtrees
  658, // Find K Closest Elements
  662, // Maximum Width of Binary Tree 
  665, // Non Decreasing Array
  669, // Trim a Binary Search Tree
  673, // Number of Longest Increasing Subsequence
  678, // Valid Parenthesis String
  680, // Valid Palindrome II
  682, // Baseball Game
  684, // Redundant Connection
  691, // Stickers to Spell Word
  695, // Max Area of Island
  698, // Partition to K Equal Sum Subsets
  701, // Insert into a Binary Search Tree
  704, // Binary Search
  705, // Design HashSet
  706, // Design HashMap
  707, // Design Linked List
  721, // Accounts Merge
  724, // Find Pivot Index
  725, // Split Linked List in Parts
  735, // Asteroid Collision
  739, // Daily Temperatures
  740, // Delete And Earn
  743, // Network Delay Time
  746, // Min Cost Climbing Stairs
  752, // Open The Lock
  763, // Partition Labels
  767, // Reorganize String
  778, // Swim In Rising Water
  783, // Minimum Distance between BST Nodes
  785, // Is Graph Bipartite?
  802, // Find Eventual Safe States
  837, // New 21 Game
  838, // Push Dominoes
  846, // Hand of Straights
  853, // Car Fleet
  876, // Middle of the Linked List
  877, // Stone Game
  879, // Profitable Schemes
  881, // Boats to Save People
  894, // All Possible Full Binary Trees
  895, // Maximum Frequency Stack
  901, // Online Stock Span
  904, // Fruits into Basket
  909, // Snakes And Ladders
  912, // Sort an Array
  918, // Maximum Sum Circular Subarray
  920, // Number of Music Playlists
  926, // Flip String to Monotone Increasing
  929, // Unique Email Addresses
  934, // Shortest Bridge
  946, // Validate Stack Sequences
  951, // Flip Equivalent Binary Trees
  953, // Verifying An Alien Dictionary
  958, // Check Completeness of a Binary Tree
  973, // K Closest Points to Origin
  977, // Squares of a Sorted Array
  978, // Longest Turbulent Array
  981, // Time Based Key Value Store
  983, // Minimum Cost For Tickets
  989, // Add to Array-Form of Integer
  1011, // Capacity to Ship Packages
  1020, // Number of Enclaves
  1029, // Two City Scheduling
  1035, // Uncrossed Lines
  1041, // Robot Bounded In Circle
  1046, // Last Stone Weight
  1049, // Last Stone Weight II
  1071, // Greatest Common Divisor of Strings
  1091, // Shortest Path in Binary Matrix
  1094, // Car Pooling
  1129, // Shortest Path with Alternating Colors
  1137, // N-th Tribonacci Number
  1140, // Stone Game II
  1143, // Longest Common Subsequence
  1162, // As Far from Land as Possible
  1189, // Maximum Number of Balloons
  1209, // Remove All Adjacent Duplicates In String II
  1220, // Count Vowels Permutation
  1239, // Maximum Length of a Concatenated String With Unique Characters
  1254, // Number of Closed Islands
  1260, // Shift 2D Grid
  1268, // Search Suggestions System
  1288, // Remove Covered Intervals
  1299, // Replace Elements With Greatest Element On Right Side
  1343, // Number of Sub Arrays of Size K and Avg Greater than or Equal to Threshold
  1359, // Count all Valid Pickup and Delivery Options
  1376, // Time Needed to Inform All Employees 
  1383, // Maximum Performance of a Team
  1396, // Design Underground System
  1405, // Longest Happy String
  1406, // Stone Game III
  1423, // Maximum Points You Can Obtain From Cards
  1443, // Minimum Time to Collect All Apples in a Tree
  1456, // Maximum Number of Vowels in a Substring of Given Length
  1461, // Check if a String Contains all Binary Codes of Size K
  1462, // Course Schedule IV
  1466, // Reorder Routes to Make All Paths Lead to The City Zero
  1470, // Shuffle the Array
  1472, // Design Browser History
  1489, // Find Critical and Pseudo Critical Edges in Minimum Spanning Tree
  1498, // Number of Subsequences That Satisfy The Given Sum Condition
  1514, // Path with Maximum Probability
  1523, // Count Odd Numbers in an Interval Range
  1547, // Minimum Cost to Cut a Stick
  1553, // Minimum Number of Days to Eat N Oranges
  1557, // Minimum Number of Vertices to Reach all Nodes
  1572, // Matrix Diagonal Sum
  1579, // Remove Max Number of Edges to Keep Graph Fully Traversable
  1603, // Design Parking System
  1626, // Best Team with no Conflicts
  1631, // Path with Minimum Effort
  1639, // Number of Ways to Form a Target String Given a Dictionary
  1647, // Minimum Deletions to Make Character Frequencies Unique
  1658, // Minimum Operations to Reduce X to Zero
  1675, // Minimize Deviation in Array
  1721, // Swapping Nodes in a Linked List
  1768, // Merge Strings Alternately
  1799, // Maximize Score after N Operations
  1822, // Sign of An Array
  1834, // Single Threaded Cpu
  1838, // Frequency of The Most Frequent Element
  1845, // Seat Reservation Manager
  1849, // Splitting a String Into Descending Consecutive Values
  1856, // Maximum Subarray Min Product
  1857, // Largest Color Value in a Directed Graph
  1866, // Number of Ways to Rearrange Sticks With K Sticks Visible
  1871, // Jump Game VII
  1882, // Process Tasks Using Servers
  1888, // Minimum Number of Flips to Make The Binary String Alternating
  1898, // Maximum Number of Removable Characters
  1905, // Count Sub Islands
  1921, // Eliminate Maximum Number of Monsters
  1929, // Concatenation of Array
  1930, // Unique Length 3 Palindromic Subsequences
  1958, // Check if Move Is Legal
  1963, // Minimum Number of Swaps to Make The String Balanced
  1964, // Find the Longest Valid Obstacle Course at Each Position
  1968, // Array With Elements Not Equal to Average of Neighbors
  1980, // Find Unique Binary String
  1984, // Minimum Difference Between Highest And Lowest of K Scores
  1985, // Find The Kth Largest Integer In The Array
  1993, // Operations On Tree
  2001, // Number of Pairs of Interchangeable Rectangles
  2002, // Maximum Product of The Length of Two Palindromic Subsequences
  2017, // Grid Game
  2028, // Find Missing Observations
  2101, // Detonate the Maximum Bombs
  2130, // Maximum Twin Sum Of A Linked List
  2140, // Solving Questions With Brainpower
  2215, // Find the Difference of Two Arrays
  2218, // Maximum Value of K Coins from Piles
  2300, // Successful Pairs of Spells and Potions
  2306, // Naming a Company
  2348, // Number of Zero-Filled Subarrays
  2359, // Find Closest Node to Given Two Nodes
  2369, // Check if There is a Valid Partition For The Array
  2390, // Removing Stars From a String
  2405, // Optimal Partition of String
  2421, // Number of Good Paths
  2439, // Minimize Maximum of Array
  2466, // Count Ways to Build Good Strings
  2477, // Minimum Fuel Cost to Report to the Capital
  2483, // Minimum Penalty for a Shop
  2492, // Minimum Score of a Path Between Two Cities
  2542, // Maximum Subsequence Score
  2616, // Minimize the Maximum Difference of Pairs
  2707, // Extra Characters in a String
  5782, // Maximum Alternating Subsequence Sum
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
