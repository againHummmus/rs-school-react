import useStore from "../../../store/store";
import MiniCard from "../../ui/mini-card/MiniCard";
import type { Anime } from "../../types";

function escapeCSV(value: string | number | null | undefined): string {
  const str = String(value ?? '');
  return str.includes(',') || str.includes('"') || str.includes('\n')
    ? `"${str.replace(/"/g, '""')}"`
    : str;
}

function downloadCSV(items: Anime[]) {
  const headers = ['ID', 'Title', 'Title (Japanese)', 'Year', 'Episodes', 'Score', 'Status', 'Rating', 'Duration', 'Genres', 'Description', 'Details URL'];
  const rows = items.map((item) => [
    item.mal_id,
    escapeCSV(item.title_english ?? item.title_japanese),
    escapeCSV(item.title_japanese),
    item.year || '',
    item.episodes || '',
    item.score || '',
    escapeCSV(item.status),
    escapeCSV(item.rating),
    escapeCSV(item.duration),
    escapeCSV(item.genres.map((g) => g.name).join('; ')),
    escapeCSV(item.synopsis),
    `${window.location.origin}/details/${item.mal_id}`,
  ].join(','));

  const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${items.length}_items.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function SelectedItems() {
  const selectedItems = useStore((state) => state.selectedItems);
  const removeAllSelectedItems = useStore((state) => state.removeAllSelectedItems);

  return (
    <div className="sticky bottom-0 z-50 w-full rounded-t-2xl border-t border-foreground/30 bg-foreground/95 backdrop-blur-md p-6 shadow-2xl">
      <div className='container flex flex-col gap-4'>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-background font-display">Selected Items</h2>
            <span className="text-sm font-semibold text-background/60 bg-background/10 rounded-full px-2.5 py-0.5">
              {selectedItems.length}
            </span>
          </div>
        </div>

        <ul className='max-h-75 overflow-y-scroll no-scrollbar flex flex-col gap-2'>
          {selectedItems.map((item) => (
            <MiniCard key={item.mal_id} {...item} />
          ))}
        </ul>

        <div className="flex gap-3">
          <button
            className="cursor-pointer h-10 px-6 bg-accent-dark text-foreground rounded-lg hover:bg-accent-dark/90 transition-all font-semibold disabled:opacity-40 disabled:pointer-events-none"
            disabled={selectedItems.length === 0}
            onClick={() => downloadCSV(selectedItems)}
          >
            Download
          </button>
          <button
            className="cursor-pointer h-10 px-6 border border-background/30 text-background rounded-lg hover:bg-background/10 transition-all font-semibold disabled:opacity-40 disabled:pointer-events-none"
            disabled={selectedItems.length === 0}
            onClick={removeAllSelectedItems}
          >
            Deselect all
          </button>
        </div>
      </div>
    </div>
  );
}