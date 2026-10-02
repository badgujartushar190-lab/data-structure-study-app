import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  Layers,
  HelpCircle,
  ShieldCheck,
  Table
} from 'lucide-react';

export const Chapter8SummarySection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const interviewQuestions = [
    {
      q: 'Q1: Why should table capacity m be a prime number not close to a power of 2 when using the Division Hash Method h(k) = k % m?',
      a: 'If m is a power of 2 (i.e. m = 2^p), the modulo operation k % m is equivalent to masking the lowest p binary bits of k (k & (2^p - 1)). As a result, all higher bits of the key are completely ignored, causing severe clustering if keys share common suffixes. Selecting a prime number m that is not close to a power of 2 ensures that all bits of the key contribute to determining the index.'
    },
    {
      q: 'Q2: What is the difference between Primary Clustering and Secondary Clustering in Open Addressing?',
      a: 'Primary Clustering occurs in Linear Probing: continuous blocks of occupied slots form, and any key hashing into or near the cluster must traverse the entire run and extend it by one slot. Clusters grow larger and merge into massive blocks. Secondary Clustering occurs in Quadratic Probing: while continuous blocks do not merge, any two keys that hash to the identical initial slot (h(k1) == h(k2)) will follow the exact same probe sequence. Double Hashing solves both by ensuring step sizes depend on the key itself.'
    },
    {
      q: 'Q3: Why must a deleted slot in Open Addressing be marked with a TOMBSTONE marker instead of being reset to EMPTY?',
      a: 'In Open Addressing, search algorithms probe consecutive slots until either finding the target key or encountering an EMPTY slot (which signals that the key is not present). If a deleted slot were reset to EMPTY, any search for a collided key that had previously probed past that slot would stop prematurely and return false (a false negative). Marking the slot as DELETED / TOMBSTONE allows subsequent searches to continue probing past it while still permitting insertions to reuse the slot.'
    },
    {
      q: 'Q4: Can the Load Factor alpha exceed 1.0 in Separate Chaining? What about in Open Addressing?',
      a: 'In Separate Chaining, elements reside in external linked lists attached to bucket heads. Therefore, n can far exceed m (e.g. n = 500, m = 100 yields alpha = 5.0, meaning an average chain length of 5 nodes). In Open Addressing, all elements are stored directly inside the m table slots; hence n cannot exceed m, and alpha is strictly bounded by 1.0 (and kept <= 0.75 in practice to maintain performance).'
    },
    {
      q: 'Q5: What is a HashDoS attack, and how do production runtimes protect against it?',
      a: 'A Hash Denial-of-Service (HashDoS) attack occurs when an attacker deliberately sends HTTP request parameters with keys engineered to hash to the exact same bucket. This degrades the hash table from O(1) expected time to O(n) worst-case time, consuming 100% CPU on the web server. Production languages (Python, Java, Rust, Go) neutralize HashDoS by utilizing SipHash or randomized per-process secret hash seeds, as well as converting long chains into balanced Red-Black Trees (e.g. Java HashMap treeify).'
    },
    {
      q: 'Q6: Why must standard fast hash functions NEVER be used for user password storage?',
      a: 'Hash table functions (modulo, MurmurHash, xxHash) and general digests (MD5, SHA-256) are optimized for maximum throughput, enabling a single modern GPU to compute billions of hashes per second. Attackers can crack passwords in seconds using precomputed rainbow tables or brute-force dictionaries. Passwords must strictly be stored using slow, computationally expensive Key Derivation Functions (Argon2, bcrypt, PBKDF2) with random Salt and tunable Work Factors (memory and iteration costs).'
    }
  ];

  return (
    <div className="mt-12 pt-8 border-t border-slate-800 space-y-6">
      {/* Accordion Toggle Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-cyan-500/40 transition-all shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BookmarkCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Chapter 8 Master Reference
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Hashing & Collision Revision Guide
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 mt-0.5">
              Collision Strategies, Asymptotic Face-Off & Viva Examination Bank
            </h3>
          </div>
        </div>

        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-8 animate-fadeIn">
          {/* Table 1: Collision Resolution Matrix */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <Table className="w-4 h-4 text-cyan-400" />
              <h4>Collision Resolution Paradigms Comparison</h4>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Method</th>
                    <th className="p-3.5 text-cyan-400">Storage Location</th>
                    <th className="p-3.5 text-amber-400">Load Factor Limit</th>
                    <th className="p-3.5 text-rose-400">Clustering Vulnerability</th>
                    <th className="p-3.5 text-emerald-400">Cache Locality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Separate Chaining</td>
                    <td className="p-3.5 text-cyan-300">External Linked Lists</td>
                    <td className="p-3.5 text-emerald-400 font-bold">Unbounded (&gt; 1.0)</td>
                    <td className="p-3.5 text-emerald-400 font-bold">None</td>
                    <td className="p-3.5 text-rose-400">Poor (heap pointer chasing)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Linear Probing</td>
                    <td className="p-3.5 text-cyan-300">Internal Array (h + i) % m</td>
                    <td className="p-3.5 text-rose-400 font-bold">&lt; 1.0 (keep &lt; 0.70)</td>
                    <td className="p-3.5 text-rose-400 font-bold">Primary Clustering</td>
                    <td className="p-3.5 text-emerald-400 font-bold">Excellent (contiguous slots)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Quadratic Probing</td>
                    <td className="p-3.5 text-cyan-300">Internal Array (h + i^2) % m</td>
                    <td className="p-3.5 text-rose-400 font-bold">&lt; 1.0 (keep &lt; 0.50)</td>
                    <td className="p-3.5 text-amber-400">Secondary Clustering</td>
                    <td className="p-3.5 text-cyan-300">Moderate</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Double Hashing</td>
                    <td className="p-3.5 text-cyan-300">Internal Array (h1 + i*h2) % m</td>
                    <td className="p-3.5 text-rose-400 font-bold">&lt; 1.0 (keep &lt; 0.75)</td>
                    <td className="p-3.5 text-emerald-400 font-bold">None (uniform spread)</td>
                    <td className="p-3.5 text-cyan-300">Moderate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Search Structures Face-Off */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h4>Search Structures Architectural Comparison</h4>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Data Structure</th>
                    <th className="p-3.5 text-cyan-400">Search Time</th>
                    <th className="p-3.5 text-emerald-400">Insertion Time</th>
                    <th className="p-3.5">Ordered Traversal</th>
                    <th className="p-3.5">Range Query Support</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Unordered Array</td>
                    <td className="p-3.5 text-rose-400">O(n)</td>
                    <td className="p-3.5 text-emerald-400">O(1) append</td>
                    <td className="p-3.5 text-slate-500">Requires O(n log n) sort</td>
                    <td className="p-3.5 text-rose-400">O(n) scan</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Sorted Array</td>
                    <td className="p-3.5 text-cyan-300">O(log n) binary search</td>
                    <td className="p-3.5 text-rose-400">O(n) shifting</td>
                    <td className="p-3.5 text-emerald-400">O(n) sequential</td>
                    <td className="p-3.5 text-emerald-400">O(log n + k)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Balanced BST (AVL/RB)</td>
                    <td className="p-3.5 text-cyan-300">O(log n) guaranteed</td>
                    <td className="p-3.5 text-cyan-300">O(log n) guaranteed</td>
                    <td className="p-3.5 text-emerald-400">O(n) Inorder traversal</td>
                    <td className="p-3.5 text-emerald-400 font-bold">O(log n + k) Excellent</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Hash Table</td>
                    <td className="p-3.5 text-emerald-400 font-bold">O(1) expected</td>
                    <td className="p-3.5 text-emerald-400 font-bold">O(1) amortized</td>
                    <td className="p-3.5 text-rose-400">Unsupported (unordered)</td>
                    <td className="p-3.5 text-rose-400">O(n) scan (Inefficient)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Technical Viva Interview Questions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <h4>Academic Viva & Technical Interview Questions</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interviewQuestions.map((item, idx) => (
                <div
                  key={`viva-${idx}`}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                >
                  <span className="font-mono font-bold text-cyan-300 text-xs block leading-snug">
                    {item.q}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Authoritative Citations Footer */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Curriculum aligned with: Cormen, Leiserson, Rivest, Stein (CLRS Ch 11); Donald Knuth (TAOCP Vol 3); Robert Sedgewick.</span>
            </div>
            <span>ISO C99 Standards</span>
          </div>
        </div>
      )}
    </div>
  );
};
