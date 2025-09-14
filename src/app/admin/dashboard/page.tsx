import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const deliverables = [
    { id: "D001", name: "User Growth Report Q3", status: "Completed", owner: "Analytics Team" },
    { id: "D002", name: "New Feature Rollout: Stories", status: "In Progress", owner: "Product Team" },
    { id: "D003", name: "Server Infrastructure Migration", status: "Pending", owner: "DevOps" },
    { id: "D004", name: "Marketing Campaign Analysis", status: "Completed", owner: "Marketing" },
    { id: "D005", name: "Mobile App Performance Audit", status: "In Progress", owner: "Mobile Team" },
];


export default function AdminDashboardPage() {
  return (
    <div className="w-full max-w-4xl">
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Admin Dashboard</CardTitle>
        <CardDescription>
          Overview of key deliverables and site metrics.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="mb-4 text-lg font-semibold">Admin Page Deliverables</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliverables.map((item) => (
                <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.owner}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
  );
}
