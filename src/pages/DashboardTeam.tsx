import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTeam } from "@/hooks/useTeam";
import { useStudent } from "@/hooks/useStudent";
import { TeamProgress } from "@/components/team/TeamProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, Plus, UserPlus, Copy, Check, FileText, Crown, Loader2, 
  TrendingUp, Trash2, LogOut, AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DashboardTeam() {
  const { student } = useStudent();
  const { 
    team, 
    hasTeam, 
    members, 
    notes, 
    memberProgress,
    isLoading,
    isLoadingMembership,
    createTeam, 
    joinTeam, 
    addNote,
    deleteNote,
    leaveTeam,
    isLeader,
  } = useTeam();

  const [joinCode, setJoinCode] = useState("");
  const [teamName, setTeamName] = useState("");
  const [copied, setCopied] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const handleCopyCode = () => {
    if (!team) return;
    navigator.clipboard.writeText(team.join_code);
    setCopied(true);
    toast.success("Team code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }

    try {
      const newTeam = await createTeam.mutateAsync({ name: teamName });
      toast.success(`Team created! Share code: ${newTeam.join_code}`);
      setTeamName("");
    } catch (error: any) {
      toast.error(error.message || "Failed to create team");
    }
  };

  const handleJoinTeam = async () => {
    if (!joinCode.trim()) {
      toast.error("Please enter a team code");
      return;
    }

    try {
      await joinTeam.mutateAsync({ joinCode });
      toast.success("Successfully joined the team!");
      setJoinCode("");
    } catch (error: any) {
      toast.error(error.message || "Failed to join team");
    }
  };

  const handleAddNote = async () => {
    if (!newNote.title.trim()) {
      toast.error("Please enter a note title");
      return;
    }

    try {
      await addNote.mutateAsync({ title: newNote.title, content: newNote.content });
      toast.success("Note added!");
      setNewNote({ title: "", content: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to add note");
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote.mutateAsync(noteId);
      toast.success("Note deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete note");
    }
  };

  const handleLeaveTeam = async () => {
    try {
      await leaveTeam.mutateAsync();
      toast.success("You have left the team");
    } catch (error: any) {
      toast.error(error.message || "Failed to leave team");
    }
  };

  // Loading state
  if (isLoadingMembership) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // No team - show create/join
  if (!hasTeam) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Team Space</h1>
            <p className="text-muted-foreground mt-1">
              Collaborate with teammates on your startup
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Create Team */}
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Create a Team</CardTitle>
                <CardDescription>
                  Start a new team and invite your co-founders to collaborate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    placeholder="e.g., Future Founders"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleCreateTeam} 
                  className="w-full" 
                  disabled={createTeam.isPending}
                >
                  {createTeam.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Team
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Join Team */}
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mb-2">
                  <UserPlus className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle>Join a Team</CardTitle>
                <CardDescription>
                  Enter a team code to join an existing team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="joinCode">Team Code</Label>
                  <Input
                    id="joinCode"
                    placeholder="NBL-XXXXXX"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  />
                </div>
                <Button 
                  onClick={handleJoinTeam} 
                  variant="outline" 
                  className="w-full" 
                  disabled={joinTeam.isPending}
                >
                  {joinTeam.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Join Team
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Info Card */}
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="py-6">
              <div className="flex gap-4">
                <Users className="h-8 w-8 text-muted-foreground/50 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Why work in a team?</h3>
                  <p className="text-sm text-muted-foreground">
                    Building a startup with co-founders lets you combine different skills, share the workload, 
                    and support each other through challenges. Many successful startups were built by teams!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Has team - show team workspace
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{team?.name}</h1>
            <p className="text-muted-foreground mt-1">
              Team workspace • {members.length} member{members.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg">
              <span className="text-sm text-muted-foreground font-mono">{team?.join_code}</span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopyCode}>
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Leave Team?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to leave "{team?.name}"? You can rejoin later with the team code.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLeaveTeam} className="bg-destructive text-destructive-foreground">
                    Leave Team
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Tabs defaultValue="progress" className="space-y-4">
          <TabsList>
            <TabsTrigger value="progress">
              <TrendingUp className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="h-4 w-4 mr-2" />
              Members
            </TabsTrigger>
            <TabsTrigger value="notes">
              <FileText className="h-4 w-4 mr-2" />
              Notes
            </TabsTrigger>
          </TabsList>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <TeamProgress memberProgress={memberProgress} currentStudentId={student?.id} />
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Team Members</CardTitle>
                <CardDescription>
                  Share the team code to invite more members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {member.student?.full_name?.charAt(0) || '?'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {member.student?.full_name || 'Unknown'}
                            {member.student_id === student?.id && (
                              <span className="text-xs text-muted-foreground ml-2">(you)</span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Joined {format(new Date(member.joined_at), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      {member.role === "leader" && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Note</CardTitle>
                <CardDescription>
                  Share ideas and updates with your team (synced in real-time)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Write your note..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddNote} disabled={!newNote.title.trim() || addNote.isPending}>
                  {addNote.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Add Note
                </Button>
              </CardContent>
            </Card>

            {notes.length > 0 ? (
              <div className="space-y-3">
                {notes.map((note) => (
                  <Card key={note.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{note.title}</h4>
                          {note.content && (
                            <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{note.content}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            By {note.creator?.full_name || 'Unknown'} · {format(new Date(note.created_at), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                        {note.created_by === student?.id && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDeleteNote(note.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground">
                    No notes yet. Add your first team note above!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
