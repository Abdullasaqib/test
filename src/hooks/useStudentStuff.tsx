import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "./useStudent";

export interface StudentProject {
    id: string;
    type: 'certification' | 'artifact';
    title: string;
    subtitle?: string;
    date: string;
    thumbnail_url?: string | null;
    slug?: string;
    metadata?: any;
}

export function useStudentStuff() {
    const { student, loading: studentLoading } = useStudent();

    const { data: projects = [], isLoading: projectsLoading } = useQuery({
        queryKey: ['student-projects', student?.id],
        queryFn: async () => {
            if (!student) return [];

            // 1. Fetch completed certifications
            const { data: certs } = await supabase
                .from('student_certifications')
                .select(`
          id,
          completed_at,
          certification_id,
          certifications (
            name,
            slug,
            badge_image_url
          )
        `)
                .eq('student_id', student.id)
                .not('completed_at', 'is', null);

            // 2. Fetch completed industry certifications
            const { data: industryCerts } = await supabase
                .from('student_industry_progress')
                .select(`
          id,
          completed_at,
          certification_id,
          industry_certifications (
            name,
            slug,
            icon
          )
        `)
                .eq('student_id', student.id)
                .not('completed_at', 'is', null);

            // 3. Fetch artifacts
            const { data: artifacts } = await supabase
                .from('artifacts')
                .select('*')
                .eq('student_id', student.id)
                .order('created_at', { ascending: false });

            const mappedCerts: StudentProject[] = (certs || []).map(c => ({
                id: c.id,
                type: 'certification',
                title: (c.certifications as any)?.name || 'Certification',
                subtitle: 'Completed Course',
                date: c.completed_at!,
                thumbnail_url: (c.certifications as any)?.badge_image_url,
                slug: (c.certifications as any)?.slug,
            }));

            const mappedIndustryCerts: StudentProject[] = (industryCerts || []).map(c => ({
                id: c.id,
                type: 'certification',
                title: (c.industry_certifications as any)?.name || 'Industry Certification',
                subtitle: 'Specialization Completed',
                date: c.completed_at!,
                thumbnail_url: null,
                slug: (c.industry_certifications as any)?.slug,
                metadata: { icon: (c.industry_certifications as any)?.icon }
            }));

            const mappedArtifacts: StudentProject[] = (artifacts || []).map(a => ({
                id: a.id,
                type: 'artifact',
                title: a.title,
                subtitle: a.artifact_type.replace(/_/g, ' '),
                date: a.created_at || new Date().toISOString(),
                metadata: a.content,
            }));

            // Combine and sort by date
            return [...mappedCerts, ...mappedIndustryCerts, ...mappedArtifacts].sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        },
        enabled: !!student && !studentLoading,
    });

    return {
        projects,
        loading: studentLoading || projectsLoading,
    };
}
