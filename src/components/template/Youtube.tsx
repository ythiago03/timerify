import { FileMusic, SkipBack, Pause, SkipForward } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

const Youtube: React.FC = () => {
  return (
    <div className="flex items-center p-3 gap-3 h-20 w-1/4 rounded-lg border border-foreground">
      <Popover>
        <PopoverTrigger asChild>
          <button>
            <FileMusic className="h-12 w-12" />
          </button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-80 mb-6">
          <h4 className="font-bold leading-none">Choose a song from youtube</h4>
          <p className="text-sm text-muted-foreground">
            Insert a link to some music from youtube to play in the background.
          </p>
          <div className="grid grid-cols-3 items-center mt-4 gap-4">
            <Label htmlFor="width">Link</Label>
            <Input id="width" className="col-span-2 h-8" />
          </div>
          <div className="flex gap-3">
            <PopoverClose asChild>
              <Button className="mt-3 w-1/2" variant="destructive">
                Cancel
              </Button>
            </PopoverClose>

            <Button className="mt-3 w-1/2">Play</Button>
          </div>
        </PopoverContent>
      </Popover>
      <div className="flex flex-col">
        <span className="font-bold">Playing now</span>
        <span>Chocolate Lily - Kobaryo</span>
      </div>
      <div className="flex ml-auto">
        <button>
          <SkipBack />
        </button>
        <button>
          <Pause />
        </button>
        <button>
          <SkipForward />
        </button>
      </div>
    </div>
  );
};

export default Youtube;
